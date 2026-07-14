param(
    [string]$SourceDirectory = (Join-Path $PSScriptRoot '..\images\guests'),
    [string]$OutputDirectory = (Join-Path $PSScriptRoot '..\images\guest-gallery'),
    [string]$ManifestPath = (Join-Path $PSScriptRoot '..\js\guest-gallery-manifest.js'),
    [int]$MaximumEdge = 1200,
    [int]$JpegQuality = 82
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

function Get-StableName {
    param([Parameter(Mandatory)][string]$Value)

    $sha256 = [System.Security.Cryptography.SHA256]::Create()

    try {
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($Value)
        $hash = [System.BitConverter]::ToString($sha256.ComputeHash($bytes)).Replace('-', '').ToLowerInvariant()
        return 'guest-' + $hash.Substring(0, 12) + '.jpg'
    }
    finally {
        $sha256.Dispose()
    }
}

function Set-ImageOrientation {
    param([Parameter(Mandatory)][System.Drawing.Image]$Image)

    $orientationId = 274

    if (-not ($Image.PropertyIdList -contains $orientationId)) {
        return
    }

    $orientation = [System.BitConverter]::ToUInt16($Image.GetPropertyItem($orientationId).Value, 0)

    switch ($orientation) {
        2 { $Image.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipX) }
        3 { $Image.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
        4 { $Image.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipX) }
        5 { $Image.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipX) }
        6 { $Image.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
        7 { $Image.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipX) }
        8 { $Image.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
    }
}

function Save-OptimizedPhoto {
    param(
        [Parameter(Mandatory)][System.IO.FileInfo]$Source,
        [Parameter(Mandatory)][string]$Destination
    )

    $image = [System.Drawing.Image]::FromFile($Source.FullName)

    try {
        Set-ImageOrientation -Image $image

        $longEdge = [Math]::Max([double]$image.Width, [double]$image.Height)
        $scale = 1.0

        if ($longEdge -gt $MaximumEdge) {
            $scale = [double]$MaximumEdge / $longEdge
        }

        $width = [Math]::Max(1, [int][Math]::Round($image.Width * $scale))
        $height = [Math]::Max(1, [int][Math]::Round($image.Height * $scale))
        $bitmap = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)

        try {
            $bitmap.SetResolution(96, 96)
            $graphics = [System.Drawing.Graphics]::FromImage($bitmap)

            try {
                $graphics.Clear([System.Drawing.Color]::White)
                $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
                $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
                $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
                $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
                $graphics.DrawImage($image, 0, 0, $width, $height)
            }
            finally {
                $graphics.Dispose()
            }

            $jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
                Where-Object { $_.MimeType -eq 'image/jpeg' } |
                Select-Object -First 1
            $encoderParameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $encoderParameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
                [System.Drawing.Imaging.Encoder]::Quality,
                [long]$JpegQuality
            )

            try {
                $bitmap.Save($Destination, $jpegEncoder, $encoderParameters)
            }
            finally {
                $encoderParameters.Dispose()
            }

            return [PSCustomObject]@{
                Width = $width
                Height = $height
            }
        }
        finally {
            $bitmap.Dispose()
        }
    }
    finally {
        $image.Dispose()
    }
}

$sourcePath = [System.IO.Path]::GetFullPath($SourceDirectory)
$outputPath = [System.IO.Path]::GetFullPath($OutputDirectory)
$manifestFile = [System.IO.Path]::GetFullPath($ManifestPath)

if (-not (Test-Path -LiteralPath $sourcePath -PathType Container)) {
    throw "Guest image directory not found: $sourcePath"
}

[System.IO.Directory]::CreateDirectory($outputPath) | Out-Null
[System.IO.Directory]::CreateDirectory([System.IO.Path]::GetDirectoryName($manifestFile)) | Out-Null

$supportedExtensions = @('.jpg', '.jpeg', '.png')
$sourceFiles = @(Get-ChildItem -LiteralPath $sourcePath -File |
    Where-Object { $supportedExtensions -contains $_.Extension.ToLowerInvariant() } |
    Sort-Object Name)

if (-not $sourceFiles.Count) {
    throw "No supported guest images were found in $sourcePath"
}

$manifest = @(foreach ($source in $sourceFiles) {
        $outputName = Get-StableName -Value $source.Name
        $destination = Join-Path $outputPath $outputName
        $dimensions = Save-OptimizedPhoto -Source $source -Destination $destination

        [ordered]@{
            src = 'images/guest-gallery/' + $outputName
            width = $dimensions.Width
            height = $dimensions.Height
            source = $source.Name
        }
    }
)

$json = $manifest | ConvertTo-Json -Depth 3 -Compress
$contents = "window.GuestlandGuestPhotos = $json;`r`n"
[System.IO.File]::WriteAllText($manifestFile, $contents, (New-Object System.Text.UTF8Encoding($false)))

Write-Output "Built $($manifest.Count) optimized guest photos and updated $manifestFile"
