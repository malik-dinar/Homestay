param(
    [string]$SourceDirectory = (Join-Path $PSScriptRoot '../images/rooms'),
    [string]$ManifestPath = (Join-Path $PSScriptRoot '../js/room-gallery-manifest.js')
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$sourcePath = [System.IO.Path]::GetFullPath($SourceDirectory)
$manifestFile = [System.IO.Path]::GetFullPath($ManifestPath)
$projectPath = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))

if (-not (Test-Path -LiteralPath $sourcePath -PathType Container)) {
    throw "Room image directory not found: $sourcePath"
}

$supportedExtensions = @('.avif', '.gif', '.jpeg', '.jpg', '.png', '.webp')
$roomPhotos = @(Get-ChildItem -LiteralPath $sourcePath -File -Recurse |
    Where-Object { $supportedExtensions -contains $_.Extension.ToLowerInvariant() } |
    ForEach-Object {
        $_.FullName.Substring($projectPath.Length).TrimStart([char[]]@('\', '/')).Replace('\', '/')
    } |
    Sort-Object)

$json = ConvertTo-Json -InputObject $roomPhotos -Compress

if (-not $roomPhotos.Count) {
    $json = '[]'
}

$contents = "window.GuestlandRoomPhotos = $json;`r`n"
[System.IO.Directory]::CreateDirectory([System.IO.Path]::GetDirectoryName($manifestFile)) | Out-Null
[System.IO.File]::WriteAllText($manifestFile, $contents, (New-Object System.Text.UTF8Encoding($false)))

Write-Output "Indexed $($roomPhotos.Count) room photos and updated $manifestFile"
