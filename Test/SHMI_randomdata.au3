#cs Sample values for SHMI

How to use:
Copy the "randomdata.exe" and the "data_template.json" into the SHMI/data directory and start it


#ce

Dim $d[13]
Dim $a[7]
$a[0] = 1

Dim $up = true
Dim $down = false

Dim $h = FileOpen( @scriptdir & "\data_template.json")
Dim $tmp = FileRead ( $h )
FileClose($h)

; ====================================================================
While Sleep(500)

   $templ = $tmp


   For $i = 0  To 11
	  $d[$i] = Random(0,1,1)
	  $templ = StringReplace($templ, "%" & $i + 10 & "%", $d[$i])
   Next

   If Not $up Then $a[0] -= 1
   If $up Then $a[0] += 1
   If $a[0] >= 70 Then
	  $up = False
   EndIf
   If $a[0] <= 30 Then
	  $up = True
   EndIf

   $templ = StringReplace($templ, "%" & 100 & "%", $a[0])
   For $i = 1 to 5
	   $a[$i] = Round( Random(0,100),2)
	   $templ = StringReplace($templ, "%" & $i + 100 & "%", $a[$i])
   Next

   $h = FileOpen( @scriptdir & "\data.json", 2)
	   FileWrite($h, $templ)
	   FileClose($h)
   ConsoleWrite( $templ & @crlf)

WEnd


