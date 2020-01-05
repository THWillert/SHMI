; Erzeugt Test-Daten für SHMI
; EXE in das Verzeichnis SHMI\Data kopieren und dort starten

$json_digi = '{"DI0":%1%,"DI1":%2%,"DI2":%3%,"DI4":%4%,"DI7":%5%,"DO0":%6%,"DO1":%7%,"DO2":%8%,"DO8":%9%,"DO9":%10%,"DO10":%11%,"DO14":%12%,'
$json_ana = '"AI0":%1%,"AI1":%2%,"AI2":%3%,"AI3":%4%,"AO0":%5%,"AO1":%6%,'
$json_sp  = '"AI0_SP":20,"AI1_SP":40,"AO1_SP":60}'

While Sleep(250)

  Dim $a[13]
  $tmp1 = $json_digi
  For $i = 0 To 12
     $a[$i] = Random(0,1,1)
     $tmp1 = StringReplace($tmp1, "%" & $i & "%", $a[$i])
  Next

  Dim $a[7]

  $tmp2 = $json_ana
  For $i = 0 To 6
    $a[$i] = Random(20,60)
    $tmp2 = StringReplace($tmp2, "%" & $i & "%", $a[$i])

   Next
  $h = FileOpen( @scriptdir & "\data.json", 2)
    FileWrite($h, $tmp1 & $tmp2 & $json_sp)
    FileClose($h)
  ConsoleWrite( $tmp1 & $tmp2 & @crlf)

WEnd
