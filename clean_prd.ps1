$raw = Get-Content -Raw "prd_text.txt"
$clean = $raw -replace "<[^>]+>", " "
$clean = [regex]::Replace($clean, "\s+", " ")
Set-Content -Path "prd_clean.txt" -Value $clean
Write-Host "Done. Length:" $clean.Length
