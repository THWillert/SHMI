Global Const $0 = "struct;word Year;word Month;word Dow;word Day;word Hour;word Minute;word Second;word MSeconds;endstruct"
Global Const $1 = "struct;long Bias;wchar StdName[32];word StdDate[8];long StdBias;wchar DayName[32];word DayDate[8];long DayBias;endstruct"
Global Const $2 = Ptr(-1)
Global Const $3 = Ptr(-1)
Global Const $4 = BitShift(0x0100, 8)
Global Const $5 = BitShift(0x2000, 8)
Global Const $6 = BitShift(0x8000, 8)
Func _6m($7, $8 = 0, $9 = True)
Local $a = "wstr"
If Not IsString($7) Then $a = "struct*"
Local $b = DllCall("kernel32.dll", "int", "WideCharToMultiByte", "uint", $8, "dword", 0, $a, $7, "int", -1, "ptr", 0, "int", 0, "ptr", 0, "ptr", 0)
If @error Or Not $b[0] Then Return SetError(@error + 20, @extended, "")
Local $c = DllStructCreate("char[" & $b[0] & "]")
$b = DllCall("kernel32.dll", "int", "WideCharToMultiByte", "uint", $8, "dword", 0, $a, $7, "int", -1, "struct*", $c, "int", $b[0], "ptr", 0, "ptr", 0)
If @error Or Not $b[0] Then Return SetError(@error + 10, @extended, "")
If $9 Then Return DllStructGetData($c, 1)
Return $c
EndFunc
Global Const $d = 'struct;dword OSVersionInfoSize;dword MajorVersion;dword MinorVersion;dword BuildNumber;dword PlatformId;wchar CSDVersion[128];endstruct'
Global Const $e = _7q()
Func _7q()
Local $f = DllStructCreate($d)
DllStructSetData($f, 1, DllStructGetSize($f))
Local $g = DllCall('kernel32.dll', 'bool', 'GetVersionExW', 'struct*', $f)
If @error Or Not $g[0] Then Return SetError(@error, @extended, 0)
Return BitOR(BitShift(DllStructGetData($f, 2), -8), DllStructGetData($f, 3))
EndFunc
Func _97()
Return @YEAR & "/" & @MON & "/" & @MDAY & " " & @HOUR & ":" & @MIN & ":" & @SEC
EndFunc
Func _9i($h)
Local $i = DllStructCreate($0, $h)
Local $j = DllStructCreate($0)
DllStructSetData($j, "Month", DllStructGetData($i, "Month"))
DllStructSetData($j, "Day", DllStructGetData($i, "Day"))
DllStructSetData($j, "Year", DllStructGetData($i, "Year"))
DllStructSetData($j, "Hour", DllStructGetData($i, "Hour"))
DllStructSetData($j, "Minute", DllStructGetData($i, "Minute"))
DllStructSetData($j, "Second", DllStructGetData($i, "Second"))
DllStructSetData($j, "MSeconds", DllStructGetData($i, "MSeconds"))
DllStructSetData($j, "DOW", DllStructGetData($i, "DOW"))
Return $j
EndFunc
Func _a5()
Local $k = DllStructCreate($1)
Local $b = DllCall("kernel32.dll", "dword", "GetTimeZoneInformation", "struct*", $k)
If @error Or $b[0] = -1 Then Return SetError(@error, @extended, 0)
Local $l[8]
$l[0] = $b[0]
$l[1] = DllStructGetData($k, "Bias")
$l[2] = _6m(DllStructGetPtr($k, "StdName"))
$l[3] = _9i(DllStructGetPtr($k, "StdDate"))
$l[4] = DllStructGetData($k, "StdBias")
$l[5] = _6m(DllStructGetPtr($k, "DayName"))
$l[6] = _9i(DllStructGetPtr($k, "DayDate"))
$l[7] = DllStructGetData($k, "DayBias")
Return $l
EndFunc
_aj()
Func _aj()
Local $m[13]
Local $n[7]
$n[0] = 1
Local $o = True
Local $p = 0
Local $q = _a5()
Local $r = $q[7] * 60
Local $s
Local $t = FileOpen(@ScriptDir & "\data_template.json")
Local $u = FileRead($t)
Local $v
FileClose($t)
While Sleep(500)
$v = $u
$p = $p ? 0 : 1
$v = StringReplace($v, "%0%", $p)
$s = _ak(_97())
$v = StringReplace($v, "%1%", $s + $r)
For $w = 0 To 11
$m[$w] = Random(0, 9, 1)
If($m[$w] = 1 Or $m[$w] = 2 Or $m[$w] = 4 Or $m[$w] = 8 Or $m[$w] = 9) Then
$v = StringReplace($v, "%" & $w + 10 & "%", $m[$w])
Else
$v = StringReplace($v, "%" & $w + 10 & "%", 0)
EndIf
Next
If Not $o Then $n[0] -= 1
If $o Then $n[0] += 1
If $n[0] >= 70 Then
$o = False
EndIf
If $n[0] <= 30 Then
$o = True
EndIf
$v = StringReplace($v, "%" & 100 & "%", $n[0])
For $w = 1 To 5
$n[$w] = Round(Random( 20 , 80), 2)
$v = StringReplace($v, "%" & $w + 100 & "%", $n[$w])
Next
$t = FileOpen(@ScriptDir & "\data.json", 2)
FileWrite($t, $v)
FileClose($t)
ConsoleWrite($v & @CRLF)
WEnd
EndFunc
Func _ak($x)
Local $y = StringSplit($x, " ")
If $y[0] - 2 Then
Return SetError(1, 0, "")
EndIf
Local $0z = StringSplit($y[1], "/")
Local $10 = StringSplit($y[2], ":")
If $0z[0] - 3 Or $10[0] - 3 Then
Return SetError(1, 0, "")
EndIf
If $0z[2] < 3 Then
$0z[2] += 12
$0z[1] -= 1
EndIf
Local $11 = Int($0z[1] / 100)
Local $12 = Int($11 / 4)
Local $13 = 2 - $11 + $12
Local $14 = Int(1461 *($0z[1] + 4716) / 4)
Local $15 = Int(153 *($0z[2] + 1) / 5)
Local $16 = $13 + $0z[3] + $14 + $15 - 2442112
Local $17 = $10[1] * 3600 + $10[2] * 60 + $10[3]
Return $16 * 86400 + $17
EndFunc
