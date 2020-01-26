# SHMI

> Achtung: WIP - nicht für den Produktiv-Einsatz geeignet.

## Übersicht

Mini-Visualisierung im Webbrowser für SPS oder andere kleine Geräte.

Es dient als reine Anzeige von Werten. Eine Steuerung von Daten ist noch nicht möglich.

Vor allem dient es dazu, ohne großen Aufwand, Werte aus einer Steuerung dazustellen.
Dazu sind keinerlei HTML, CSS oder JavaScript Kenntnisse nötig.

![Start](/images/SHMI_index.png)

### Features

- Für die Darstellung ist nur ein Browser nötig
- Responsives Design
- Darstellung von Digital, Analogwert, Sollwerten und Peak-Hold
- Für die grundlegende Konfiguration muß nur eine JSON-Datei, als Daten-Schnittstelle, von der Steuerung erzeugt werden
- Die Darstellung aller Werte auf der Startseite wird automatisch anhand der Daten-Schnittstelle erzeugt
- Werte können in Kurven dargestellt, aufgezeichnet und als CSV-Datei gespeichert werden
![Start](/images/SHMI_Recorder_2.png)
- Fließbilder können per Drag und Drop mit Anzeige-Elementen ausgestattet werden:
![Start](/images/SHMI_RI_1.png)
- Design einfach per Bootstrap-Theme zu ändern (Design oben: [Slate](https://bootswatch.com/slate/)):
![Start](/images/SHMI_index_01.png)

![Start](/images/SHMI_index_02.png)


## Voraussetzungen

Auf dem Automatiserungs-Gerät muß ein Web-Server vorhanden sein.


## Installation

Den Inhalt des Verzeichnisses SHMI auf den Web-Server kopieren und diesen passend konfigurieren.


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

#### Schnittstelle Siemens S7-1500

Beispiel-Schnittstelle zur Ausgabe von CPU-Variablen:

```
{
"DI0":":="webdata".DI[0]:",
"DI1":":="webdata".DI[1]:",
"DI2":":="webdata".DI[2]:",
"DI4":":="webdata".DI[4]:",
"DI7":":="webdata".DI[7]:",
"DO0":":="webdata".DO[0]:",
"DO1":":="webdata".DO[1]:",
"DO2":":="webdata".DO[2]:",
"DO9":":="webdata".DO[8]:",
"DO10":":="webdata".DO[9]:",
"DO10":":="webdata".DO[10]:",
"DO14":":="webdata".DO[14]:",
"AI0":":="webdata".AI[0]:",
"AI1":":="webdata".AI[1]:",
"AI2":":="webdata".AI[2]:",
"AI3":":="webdata".AI[3]:",
"AO0":":="webdata".AO[0]:",
"AO1":":="webdata".AO[1]:"
}
```

Die Werte befinden sich in einem entsprechend aufgebauten Datenbaustein "webdata".

Siehe auch Siemens: [Eigene Webseiten für S7-1200 / S7-1500 erstellen und einsetzen](https://support.industry.siemens.com/cs/document/68011496/eigene-webseiten-f%C3%BCr-s7-1200-s7-1500-erstellen-und-einsetzen?dti=0&lc=de-DE).

### Beschriftung der Datenpunkte

Die Texte für die Beschriftung befinden sich in der Datei:
`lng/de.jsn`
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

### Fließbild

Das Bild selbst wird als Hintergrundbild geladen. Es muß den gleichen Namen wie die HTML-Datei haben, nur mit dem Suffix "svg".

Alle verfügbaren Datenpunkte können als kleine Anzeigen (Design noch nicht fertig) in das Bild eingefügt werden.

Dazu wählt man in den Einstellungen die entsprechenden Datenpunkte aus. Damit wird die entsprechende Anzeige oben rechts im Bild eingefügt. Anschließend kann man diese an die passende Stelle im Bild ziehen und evtl. in der Breite verändern.

![Start](/images/SHMI_RI_1.png)

#### Speichern / Laden / Löschen

##### Speichern
Ein Speichern der Elemente ist nicht notwendig.

Sobald diese postioniert oder deren Größe verändert wurde, werden Position und die Größe der Anzeigen werden im Local-Storage des Browser gespeichert. Für jedes Element wird ein entsprechender Eintrag gespeichert.

##### Laden
Beim Laden der Seite werden die Elemente automatisch wieder angezeigt.

##### Löschen
Zum Löschen eines Elementes dieses in den Einstellungen wieder abwählen.

### Beschriftung der Oberfläche

(siehe Beschriftung der Datenpunkte)

### Logo

Die Datei `pict/logo.svg` gegen ein eigenes SVG-Bild ersetzen.

### Design der Oberfläche

Die Datei `css/bootstrap.min.css` gegen die entsprechende Theme-Datei austauschen.

Für ein "flaches" Design die Datei `css/SGMI_glow.css` umbenennen.

#### Icons

Um Platz im Zielgerät zu sparen kann man das Verzeichnis `fontsawesome` komplett weglassen. Es werden dann nur die Icons in der Oberfläche nicht angezeigt, auf die Funktion hat dies keine Auswirkung.

 
## Diskussion / Vorschläge

## ToDo

Reihenfolge entspricht nicht der Priorität:

#### Allgemein

- [x] Bibliotheken aktualisieren
- [x] Auf die aktuelle Bootstrap Version 4 aktualisieren
- [ ] Live-Bit von Steuerung visualisieren
- [ ] Dokumentation vervollständigen
- [x] CSS zusammenfassen
- [ ] Dokumentation der Quelltexte überarbeiten
- [x] Dateien vollständig hochladen
- [ ] Wechsel der Anzeigensprache über die Oberfläche
- [ ] Beschriftungen für Datenpunkte und Oberfläche in einzelne Dateien auftrennen
- [ ] Steuern von Werten (erst wenn der Rest stabil läuft)
- [ ] Einstellungen lokal speichern
- [ ] Fonts lokal speichern und abfragen
- [ ] Quelltext aufräumen - das Ganze war ein Versuchs-Projekt von 2014 mit viel Copy & Paste ...

#### Übersicht

- [ ] Variable Anzahl an Status-Seiten

##### Analog
- [ ] Min / Max für Analog-Anzeige (Skalierung)
- [x] Peak-Hold für Analog-Anzeige
- [X] Einstellung für die Haltezeit / Peak-Hold
- [x] Analog-Anzeige optimieren
- [X] Einstellung des Updateintervalls (Digital / Analog getrennt)

##### Digital

- [ ] Zeit-Anzeige für letzte Änderzung
- [X] Einstellung des Updateintervalls (Digital / Analog getrennt)

#### Recorder / Kurven

- [x] Recorder an die aktuellen Bibliotheks-Versionen anpassen und optimieren
- [ ] Oberfläche optimieren
- [ ] Evtl. Wechsel von Flot-Chart auf Chart.js (wegen Größe noch abklären)
- [ ] Zeit-Format in CSV ändern (-> Timestamp)

#### Fließbilder

- [x] Werte in Bild anzeigen.

## Benutzte Bibliotheken

- [jQuery](https://jquery.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Flot](http://www.flotcharts.org/)
- [Moment.js](https://momentjs.com/)
- [Peity](http://benpickles.github.io/peity/)
- [Simple Statistics](https://simplestatistics.org/)

## Author
Thorsten Willert

[Homepage](http://www.thorsten-willert.de/)

## Lizenz
Das ganze steht unter der [MIT](https://github.com/THWillert/SHMI/blob/master/LICENSE) Lizenz.

### Weitere
- R&I Fließbild (RI_01.svg): [Von Con-struct - Eigenes Werk, CC BY-SA 3.0](https://commons.wikimedia.org/w/index.php?curid=18266732)

- Bootstrap Theme: [Von Thomas Park / Bootswatch, MIT](https://github.com/thomaspark/bootswatch)
