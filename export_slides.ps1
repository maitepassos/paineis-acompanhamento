$pptApp = New-Object -ComObject PowerPoint.Application
$pptApp.Visible = [Microsoft.Office.Core.MsoTriState]::msoTrue
$ppt = $pptApp.Presentations.Open('C:\Claude\Skill\BU_Saude_Pitch.pptx', $false, $false, $false)
for ($i = 1; $i -le $ppt.Slides.Count; $i++) {
  $ppt.Slides[$i].Export('C:\Claude\Skill\slide_' + $i + '.png', 'PNG', 1280, 720)
}
$ppt.Close()
$pptApp.Quit()
Write-Host "Exported $($ppt.Slides.Count) slides"
