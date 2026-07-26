$xmlContent = Get-Content -Raw "temp_docx/word/document.xml"
$matches = [regex]::Matches($xmlContent, "<w:t[^>]*>(.*?)</w:t>")
$sb = [System.Text.StringBuilder]::new()
foreach ($m in $matches) {
    [void]$sb.Append($m.Groups[1].Value)
    [void]$sb.Append(" ")
}
Set-Content -Path "prd_text.txt" -Value $sb.ToString()
Write-Host "Done, length:" $sb.Length
