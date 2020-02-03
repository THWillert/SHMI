#cs Sample values for SHMI

How to use:
Copy the "SHMI_randomdata.exe" and the "data_template.json" into the SHMI/data directory and start it


#ce
#include <Date.au3>
#include <array.au3>


Dim $d[13] ; DI
Dim $a[7] ; DO
$a[0] = 1 ; live bit

Dim $up = true
Dim $down = false
Dim $LiveBit = 0;

Dim $aTime =  _Date_Time_GetTimeZoneInformation()
Dim $iTimeOffset = $aTime[7] * 60 ; time offset UTC

Dim $time

Dim $h = FileOpen( @scriptdir & "\data_template.json")
Dim $tmp = FileRead ( $h )
FileClose($h)

; ====================================================================
While Sleep(  1000 ) ; (random(0,3,1) * 1000) random: simulats bad connection

   $templ = $tmp

   $LiveBit =  $LiveBit ? 0: 1
   $templ = StringReplace($templ, "%0%", $LiveBit)


   $time = _Epoch_encrypt( _NowCalc () )
   $templ = StringReplace($templ, "%1%", $time + $iTimeOffset)

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

; trancexx
; https://www.autoitscript.com/forum/topic/83667-epoch-time/
Func _Epoch_encrypt($date)
    Local $main_split = StringSplit($date, " ")
    If $main_split[0] - 2 Then
        Return SetError(1, 0, "") ; invalid time format
    EndIf
    Local $asDatePart = StringSplit($main_split[1], "/")
    Local $asTimePart = StringSplit($main_split[2], ":")
    If $asDatePart[0] - 3 Or $asTimePart[0] - 3 Then
        Return SetError(1, 0, "") ; invalid time format
    EndIf
    If $asDatePart[2] < 3 Then
        $asDatePart[2] += 12
        $asDatePart[1] -= 1
    EndIf
    Local $i_aFactor = Int($asDatePart[1] / 100)
    Local $i_bFactor = Int($i_aFactor / 4)
    Local $i_cFactor = 2 - $i_aFactor + $i_bFactor
    Local $i_eFactor = Int(1461 * ($asDatePart[1] + 4716) / 4)
    Local $i_fFactor = Int(153 * ($asDatePart[2] + 1) / 5)
    Local $aDaysDiff = $i_cFactor + $asDatePart[3] + $i_eFactor + $i_fFactor - 2442112
    Local $iTimeDiff = $asTimePart[1] * 3600 + $asTimePart[2] * 60 + $asTimePart[3]
    Return $aDaysDiff * 86400 + $iTimeDiff
EndFunc


