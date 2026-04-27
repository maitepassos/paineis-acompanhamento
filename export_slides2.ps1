$ErrorActionPreference = "Stop"
try {
    $pptApp = New-Object -ComObject PowerPoint.Application
    $pptApp.Visible = 1
    $ppt = $pptApp.Presentations.Open("C:\Claude\Skill\BU_Saude_Pitch.pptx", 0, 0, 0)
    Write-Host "Slides: $($ppt.Slides.Count)"
    for ($i = 1; $i -le $ppt.Slides.Count; $i++) {
        $out = "C:\Claude\Skill\slide_$i.png"
        $ppt.Slides[$i].Export($out, "PNG", 1280, 720)
        Write-Host "Exported slide $i to $out"
    }
    $ppt.Close()
    $pptApp.Quit()
} catch {
    Write-Host "Error: $_"
}
