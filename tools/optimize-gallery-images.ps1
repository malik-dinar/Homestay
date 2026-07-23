param(
    [string]$SourceDirectory = (Join-Path $PSScriptRoot '../images/galleryy'),
    [int64]$MinimumBytes = 1MB,
    [int]$MaximumEdge = 2560,
    [ValidateRange(1, 100)]
    [int]$Quality = 85
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$sourcePath = [System.IO.Path]::GetFullPath($SourceDirectory)

if (-not (Test-Path -LiteralPath $sourcePath -PathType Container)) {
    throw "Gallery image directory not found: $sourcePath"
}

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object MimeType -EQ 'image/jpeg' |
    Select-Object -First 1

if (-not $jpegCodec) {
    throw 'JPEG encoder not found.'
}

$encoderParameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
$qualityParameter = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality,
    [int64]$Quality
)
$encoderParameters.Param[0] = $qualityParameter

$supportedExtensions = @('.jpeg', '.jpg')
$optimized = 0
$bytesBefore = [int64]0
$bytesAfter = [int64]0

try {
    Get-ChildItem -LiteralPath $sourcePath -File -Recurse |
        Where-Object {
            $supportedExtensions -contains $_.Extension.ToLowerInvariant() -and
            $_.Length -ge $MinimumBytes
        } |
        ForEach-Object {
            $file = $_
            $image = [System.Drawing.Image]::FromFile($file.FullName)
            $bitmap = $null
            $graphics = $null
            $imageAttributes = $null
            $temporaryPath = "$($file.FullName).optimized-$([guid]::NewGuid().ToString('N')).tmp"
            $backupPath = "$($file.FullName).pre-optimization-$([guid]::NewGuid().ToString('N')).bak"

            try {
                $sourceWidth = $image.Width
                $sourceHeight = $image.Height
                $scale = [Math]::Min(1.0, $MaximumEdge / [double][Math]::Max($sourceWidth, $sourceHeight))
                $targetWidth = [Math]::Max(1, [int][Math]::Round($sourceWidth * $scale))
                $targetHeight = [Math]::Max(1, [int][Math]::Round($sourceHeight * $scale))

                $bitmap = New-Object System.Drawing.Bitmap(
                    $targetWidth,
                    $targetHeight,
                    [System.Drawing.Imaging.PixelFormat]::Format24bppRgb
                )

                $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
                $graphics.Clear([System.Drawing.Color]::White)
                $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
                $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
                $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
                $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

                $imageAttributes = New-Object System.Drawing.Imaging.ImageAttributes
                $imageAttributes.SetWrapMode([System.Drawing.Drawing2D.WrapMode]::TileFlipXY)

                $destination = New-Object System.Drawing.Rectangle(0, 0, $targetWidth, $targetHeight)
                $graphics.DrawImage(
                    $image,
                    $destination,
                    0,
                    0,
                    $sourceWidth,
                    $sourceHeight,
                    [System.Drawing.GraphicsUnit]::Pixel,
                    $imageAttributes
                )

                $bitmap.Save($temporaryPath, $jpegCodec, $encoderParameters)
            }
            finally {
                if ($imageAttributes) {
                    $imageAttributes.Dispose()
                }

                if ($graphics) {
                    $graphics.Dispose()
                }

                if ($bitmap) {
                    $bitmap.Dispose()
                }

                $image.Dispose()
            }

            $optimizedFile = Get-Item -LiteralPath $temporaryPath
            $validationImage = [System.Drawing.Image]::FromFile($temporaryPath)

            try {
                if ($validationImage.Width -ne $targetWidth -or $validationImage.Height -ne $targetHeight) {
                    throw "Optimized dimensions do not match for $($file.FullName)."
                }
            }
            finally {
                $validationImage.Dispose()
            }

            if ($optimizedFile.Length -ge $file.Length) {
                Remove-Item -LiteralPath $temporaryPath
                Write-Output "Skipped $($file.FullName): optimized file was not smaller."
                return
            }

            $originalLength = $file.Length
            [System.IO.File]::Replace($temporaryPath, $file.FullName, $backupPath)
            Remove-Item -LiteralPath $backupPath

            $optimized += 1
            $bytesBefore += $originalLength
            $bytesAfter += (Get-Item -LiteralPath $file.FullName).Length

            Write-Output (
                'Optimized {0}: {1:N2} MB -> {2:N2} MB ({3}x{4})' -f
                $file.FullName,
                ($originalLength / 1MB),
                ((Get-Item -LiteralPath $file.FullName).Length / 1MB),
                $targetWidth,
                $targetHeight
            )
        }
}
finally {
    $qualityParameter.Dispose()
    $encoderParameters.Dispose()
}

Write-Output (
    'Optimized {0} image(s); saved {1:N2} MB.' -f
    $optimized,
    (($bytesBefore - $bytesAfter) / 1MB)
)
