$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Server listening at http://localhost:8080/"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $req = $context.Request
        $res = $context.Response
        
        $urlPath = $req.Url.LocalPath
        if ($urlPath -eq "/") { $urlPath = "/index.html" }
        
        $relPath = $urlPath.TrimStart("/").Replace("/", "\")
        $fullPath = Join-Path (Get-Location) $relPath
        
        if (Test-Path $fullPath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($fullPath)
            if ($fullPath.EndsWith(".html")) { $res.ContentType = "text/html; charset=utf-8" }
            elseif ($fullPath.EndsWith(".css")) { $res.ContentType = "text/css" }
            elseif ($fullPath.EndsWith(".js")) { $res.ContentType = "application/javascript" }
            elseif ($fullPath.EndsWith(".png")) { $res.ContentType = "image/png" }
            
            $res.ContentLength64 = $bytes.Length
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $res.StatusCode = 404
        }
        $res.Close()
    }
} finally {
    $listener.Stop()
}
