# SHMI

## Übersicht

Mini-Visualisierung im Webbrowser für SPS oder andere kleine Geräte.

![Start](/images/SHMI_index.jpg)

Das Ganze basiert auf den Bibliotheken:
- jQuery
- Bootstap
- Moment
- Flot
- Peity

## Voraussetzungen


## Installation


## Konfiguration

Die Darstellung aller Werte auf der Startseite wird automatisch erzeugt.

Bei Analog-Werten können auch die Sollwerte angezeigt werden.

Von der Steuerung muss eine entsprechnde Datei erzeugt werden:
`data/data.json`
in die Werte eingetragen werden.

Der Aufbau der Datei ist selbsterklärend.

Als Beispiel:
```json
{
"DI0":0,
"DI1":0,
"DI2":1,
"DI4":0,
"DI7":0,
"DO0":1,
"DO1":1,
"DO2":1,
"DO8":0,
"DO9":1,
"DO10":1,
"DO14":1,
"AI0":36.9535665865988,
"AI1":26.1963949818164,
"AI2":31.7761578597128,
"AI3":53.5179774835706,
"AO0":40.1912705320865,
"AO1":49.4759655464441,
"AI0_SP":20,
"AI1_SP":40,
"AO1_SP":60}
```

- DIn: Digitaleingang 
- DOn: Digitalausgang
- AIn: Analogeingang
- AOn: Analogausgang
- AIn_SP: Analogeingang Sollwert
- AOn_SP: Analogausgang Sollwert

Beim ersten Aufruf der Seite wird diese Datei ausgelesen und die Seite aufgebaut. Anschließend werden nur noch die Werte aus der Datei abgefragt.

Die Texte für die Beschriftung befinden sich in der Datei:
`lng/de.json`
und werden ebenfalls beim ersten Aufruf der Seite eingelesen.

Beispiel:
```json
{"DI0":"Steuerspannung",
"DI1":"Lampentest",
"DI2":"Störung quittieren",
"DI4":"Durchflussmessung",
"DI7":"Druckluftüberwachung",
"DO0":"Steuerspannung",
"DO1":"Störung:",
"DO2":"Motor 1",
"DO8":"Motor 1",
"DO9":"Regelventil 1",
"DO10":"Regelventil 2",
"DO14":"Regelventil 3",
"AI0":"Temperatur 1",
"AI1":"Füllstand 1",
"AI2":"Füllstand 2",
"AI3":"Durchfluss",
"AO0":"Regelventil 1",
"AO1":"Regelventil 2",
"AO2":"Regelventil 3"}
```

 
## Diskussion / Vorschläge

## ToDo

## Author
Thorsten Willert

[Homepage](http://www.thorsten-willert.de/)

## Lizenz
Das ganze steht unter der [Apache 2.0](https://github.com/THWillert/HomeMatic_CSS/blob/master/LICENSE) Lizenz.
.
