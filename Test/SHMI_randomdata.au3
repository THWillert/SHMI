; :autoIndent=full:collapseFolds=0:deepIndent=false:folding=indent:indentSize=4:maxLineLen=80:mode=autoitscript:noTabs=false:noWordSep=_@:tabSize=4:wordBreakChars=,+-\=<>/?^&*:wrap=none:

#region Includes
#include <Date.au3>
#endregion Includes

#cs Generates data for SHMI

2020 by Thorsten Willert
2020-02-09

How to use:
Copy the "SHMI_randomdata.exe" and the "data_template.json" into the SHMI/data directory and start it

#ce

Main()

Func Main()

	Local $d[13] ; DI
	Local $a[7] ; DO
	$a[0] = 1 ; live bit

	Local $up = True
	Local $livebit = 0 ;

	Local $atime = _Date_Time_GetTimeZoneInformation()
	Local $itimeoffset = $atime[7] * 60 ; time offset UTC
	Local $time

	; load template
	Local $h = FileOpen(@ScriptDir & "\data_template.json")
	Local $tmp = FileRead($h)
	Local $templ
	FileClose($h)

	; ====================================================================
	While Sleep(500) ; random(0,3,1) * 1000 random: simulats bad connection

		$templ = $tmp

		; Live-Bit toggle
		$livebit = $livebit ? 0 : 1
		$templ = StringReplace($templ, "%0%", $livebit)

		; Timestamp
		$time = _Epoch_encrypt(_NowCalc())
		$templ = StringReplace($templ, "%1%", $time + $itimeoffset)

		; Digital I/O
		For $i = 0 To 11
			$d[$i] = Random(0, 9, 1)
			If ($d[$i] = 1 Or _
					$d[$i] = 2 Or _
					$d[$i] = 4 Or _
					$d[$i] = 8 Or _
					$d[$i] = 9) Then
				$templ = StringReplace($templ, "%" & $i + 10 & "%", $d[$i])
			Else
				$templ = StringReplace($templ, "%" & $i + 10 & "%", 0)
			EndIf
		Next

		; AI0 triangle wave
		If Not $up Then $a[0] -= 1
		If $up Then $a[0] += 1
		If $a[0] >= 70 Then
			$up = False
		EndIf
		If $a[0] <= 30 Then
			$up = True
		EndIf

		; AI/O random
		$templ = StringReplace($templ, "%" & 100 & "%", $a[0])
		For $i = 1 To 5
			$a[$i] = Round(Random( 20 , 80), 2)
			$templ = StringReplace($templ, "%" & $i + 100 & "%", $a[$i])
		Next

		; write data
		$h = FileOpen(@ScriptDir & "\data.json", 2)
		FileWrite($h, $templ)
		FileClose($h)
		ConsoleWrite($templ & @CRLF)

	WEnd
EndFunc
;===============================================================================
; trancexx
; https://www.autoitscript.com/forum/topic/83667-epoch-time/
Func _Epoch_encrypt($date)
	Local $main_split = StringSplit($date, " ")
	If $main_split[0] - 2 Then
		Return SetError(1, 0, "") ; invalid time format
	EndIf
	Local $asdatepart = StringSplit($main_split[1], "/")
	Local $astimepart = StringSplit($main_split[2], ":")
	If $asdatepart[0] - 3 Or $astimepart[0] - 3 Then
		Return SetError(1, 0, "") ; invalid time format
	EndIf
	If $asdatepart[2] < 3 Then
		$asdatepart[2] += 12
		$asdatepart[1] -= 1
	EndIf
	Local $i_afactor = Int($asdatepart[1] / 100)
	Local $i_bfactor = Int($i_afactor / 4)
	Local $i_cfactor = 2 - $i_afactor + $i_bfactor
	Local $i_efactor = Int(1461 * ($asdatepart[1] + 4716) / 4)
	Local $i_ffactor = Int(153 * ($asdatepart[2] + 1) / 5)
	Local $adaysdiff = $i_cfactor + $asdatepart[3] + $i_efactor + $i_ffactor - 2442112
	Local $itimediff = $astimepart[1] * 3600 + $astimepart[2] * 60 + $astimepart[3]
	Return $adaysdiff * 86400 + $itimediff
EndFunc   ;==>_Epoch_encrypt


