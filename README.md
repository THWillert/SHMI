# SHMI

> Achtung: WIP - nicht für den Produktiv-Einsatz geeignet.

## Übersicht

Mini-Visualisierung im Webbrowser für SPS oder andere kleine Geräte.

![Start](/images/SHMI_index.png)

### Features

- Für die Darstellung ist nur ein Browser nötig
- Responsives Design
- Darstellung von Digital, Analogwert und Sollwerten
- Für die grundlegende Konfiguration muß nur eine JSON-Datei, als Daten-Schnittstelle, von der Steuerung erzeugt werden
- Die Darstellung aller Werte auf der Startseite wird automatisch anhand der Daten-Schnittstelle erzeugt
- Werte können in Kurven dargestellt, aufgezeichnet und als CSV-Datei gespeichert werden
- Design per CSS anpassbar

## Voraussetzungen

Auf dem Automatiserungs-Gerät muß ein Web-Server vorhanden sein.


## Installation

Das Inhalt des Verzeichnisses SHMI auf den Web-Server kopieren und diesen passend konfigurieren.


## Konfiguration von SHMI

### Datenpunkte

<dl>
   <dt>DIn</dt>
   <dd>Digitaleingang</dd>
   <dt>DOn</dt>
   <dd>Digitalausgang</dd>
    <dt>AIn</dt>
   <dd>Analogeingang in &</dd>
    <dt>AOn</dt>
   <dd>Analogausgang in %</dd>
    <dt>AIn_SP</dt>
   <dd>Analogeingang Sollwert in %</dd>
     <dt>AOn_SP</dt>
   <dd>Analogausgang Sollwert in %</dd>
</dl>

### Schnittstelle

Von der Steuerung muss eine entsprechende Datei erzeugt werden:
`data/data.json`
in der die Werte eingetragen werden.

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
"AO1_SP":60
}
```

Beim ersten Aufruf der Seite wird diese Datei ausgelesen und die Seite aufgebaut. Anschließend werden nur noch die Werte aus der Datei abgefragt.

### Beschriftung der Datenpunkte

Die Texte für die Beschriftung befinden sich in der Datei:
`lng/de.json`
und werden ebenfalls beim ersten Aufruf der Seite eingelesen.

Beispiel:
```json
{
"DI":"Digitaleingänge",
"DO":"Digitalausgänge",
"AI":"Analogeingänge",
"AO":"Analogausgänge",

"Setpoint_AI":"Sollwert",
"Setpoint_AO":"Sollwert",

"DI0":"Steuerspannung",
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
"AO2":"Regelventil 3"
}
```

### Beschriftung der Oberfläche

(siehe Beschriftung der Datenpunkte)

 
## Diskussion / Vorschläge

## ToDo

Reihenfolge entspricht nicht der Priorität:

- [ ] Bibliotheken aktualisieren
- [ ] Auf die aktuelle Bootstrap Version aktualisieren
- [ ] Recorder an die akutellen Bibliotheks-Versionen anpassen und optimieren
- [x] Dateien vollständig hochladen
- [ ] Wechsel der Anzeigensprache über die Oberfläche
- [ ] Min / Max für Analog-Anzeige
- [ ] Einstellung des Updateintervalls (Digital / Analog getrennt)
- [ ] Anzeigen in Anlagen-Bild integrieren
- [ ] Dokumentation vervollständigen
- [ ] CSS zusammenfassen
- [ ] Dokumentation der Quelltexte überarbeiten
- [ ] Beschriftungen für Datenpunkte und Oberfläche in einzelne Dateien auftrennen

## Author
Thorsten Willert

[Homepage](http://www.thorsten-willert.de/)

## Lizenz
Das ganze steht unter der [MIT](https://github.com/THWillert/HomeMatic_CSS/blob/master/LICENSE) Lizenz.
.
