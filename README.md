# SHMI

> WIP - nicht für den Produktiv-Einsatz geeignet.

## Übersicht

Eine kleine, webbasierte (HTML, JavaScript und SVG) Visualisierung für SPS oder andere kleine Geräte.

Mit minimalen Aufwand können damit Werte aus einer Steuerung (oder einem anderen Programm) visualisiert werden.  
Dazu sind keinerlei HTML, CSS oder JavaScript Kenntnisse nötig.

In der einfachsten Variante nur ca. 700 KB groß!

Es ist aktuell eine reine Anzeige von Werten. Eine Steuerung von Daten ist noch nicht möglich.

![Start](/docs/images/SHMI_index.png)

[Demo (statische Daten)](http://shmi.thorsten-willert.de/index.htm)

### Features

- Für die Darstellung ist nur ein Browser nötig
- Responsives Design
- Für die grundlegende Konfiguration muß nur eine JSON-Datei, als Daten-Schnittstelle, von der Steuerung erzeugt werden
- Die Darstellung aller Werte auf der Startseite wird automatisch anhand der Daten-Schnittstelle erzeugt
- Werte können in Kurven dargestellt, aufgezeichnet und als CSV-Datei gespeichert werden  
![Start](/docs/images/SHMI_Recorder_2.png)
- Fließbilder können per Drag und Drop mit Anzeige-Elementen (Mini-Panels) ausgestattet werden:  
![Start](/docs/images/SHMI_RI_1.png)
- Die Elemente in einem SVG-Bild können direkt animiert werden z.B.:  
![Start](/docs/images/SHMI_RI_03.png)  
- Design einfach per Bootstrap-Theme zu ändern (Standard-Design: [Slate](https://bootswatch.com/slate/)):  
![Start](/docs/images/SHMI_index_02.png)  
  oder per eigener Style-Sheets.
___
## Voraussetzungen

Auf dem Automatiserungs-Gerät muß ein Web-Server vorhanden sein.

Eine lokale Installation ist ebenfalls möglich.

### Browser

Getestet mit:
- FireFox (> V71.0 64bit, Windows 7)
- Edge ( >V79.0, Windows 10)

#### Browser Einstellungen bei lokaler Datenquelle
... wenn kein Web-Server installiert ist.

- FireFox: about:config
`security.fileuri.strict_origin_policy = false`
- Edge, Chrom usw.: Start-Parameter
`--allow-file-access-from-files`

___
## Installation

Den Inhalt des Verzeichnisses SHMI auf den Web-Server kopieren und diesen passend konfigurieren.

Oder lokal installieren ( siehe auch [Voraussetzungen](#voraussetzungen) )

___
## Konfiguration von SHMI

### Datenpunkte

DI/DO dürfen folgende Werte annehmen.
- 0: aus
- 1: an
- 2: Warnung (orange)
- 4: Fehler (rot)
- 8: Info + 0/1 (in SVG zusätzliche blaue Füllung) - z.B. für Handbetrieb

<dl>
   <dt>LIVE-BIT (Format: 1/0)</dt>
   <dd>Muß bei jedem neuen Datensatz toggeln:  
   Anzeige in der Statusleiste</dd>
   <dt>TIMESTAMP (Format: UNIX-Timestamp in Sekunden)</dt>
   <dd>Zeitstempel vom Gerät o. Anwendung :  
     Hier wird die Differenz zur System-Zeit berechnet und in der Statusleiste angezeigt</dd>   
   <dt>WARN (noch nicht in Gebrauch)</dt>
   <dd>Nummer der Warnmeldung - oder Text</dd> 
   <dt>ALARM (noch nicht in Gebrauch)</dt>
   <dd>Nummer der Alarmmeldung - oder Text</dd>
   <dt>MESSAGE (noch nicht in Gebrauch)</dt>
   <dd>Nummer der Betriebsmeldung - oder Text</dd>
   <dt>DIn (Format: Integer 0-9)</dt>
   <dd>Digitaleingang</dd>
   <dt>DOn (Format: Integer 0-9)</dt>
   <dd>Digitalausgang</dd>
   <dt>AIn (Format: Float oder Integer)</dt>
   <dd>Analogeingang in %</dd>
   <dt>AOn (Format: Float oder Integer)</dt>
   <dd>Analogausgang in %</dd>
   <dt>AIn_SP (Format: Float oder Integer)</dt>
   <dd>Analogeingang Sollwert in %</dd>
   <dt>AOn_SP (Format: Float oder Integer)</dt>
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
"LIVE-BIT":0,
"TIMESTAMP":1580716216,
"WARN":-1,
"ALARM":-1,
"MESSAGE":-1,
"DI0":1,
"DI1":1,
"DI2":0,
"DI4":0,
"DI7":1,
"DO0":0,
"DO1":0,
"DO2":1,
"DO8":1,
"DO9":0,
"DO10":1,
"DO14":1,
"AI0":14,
"AI1":97.07,
"AI2":44.96,
"AI3":87.43,
"AI0_SP":50,
"AI1_SP":67,
"AO0":4.77,
"AO1":8.85,
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

Die Texte für die Beschriftung der Datenpunkte befinden sich in der Datei:  
`lng/de_dp.json`  
und werden ebenfalls beim ersten Aufruf der Seite eingelesen.

Beispiel:
```json
{
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

### Recorder

> Achtung!  
> Da hier alles im Browser aufgezeichnet wird, dürfen während der Aufzeichnung, im Browser keinen weiteren Tabs offen sein. Auch > darf das Browser-Fenster nicht minimiert werden. In beiden Fällen entsehen Aussetzer bei den Messwerten. Dies kann durch einen > entsprechend hohen Update Interval evtl. kompensiert werden.

### Fließbild

Das Bild selbst wird als Hintergrundbild geladen. Es muß den gleichen Namen wie die HTML-Datei haben, nur mit dem Suffix "svg".  
Alternativ kann auch ein PNG Bild geladen werden.
> Nur SVG-Bilder können direkt animiert werden!

Priorität beim Laden:
 - SVG
 - PNG (am besten transparent)

Alle verfügbaren Datenpunkte können als kleine Anzeigen (Widgets; Design noch nicht fertig) in das Bild eingefügt werden.  
Momentan verfügbar:

![Start](/docs/images/SHMI_Instruments.png)

Dazu wählt man in den Einstellungen die entsprechenden Datenpunkte, mit der entsprechenden Darstellungsart, aus. Damit wird die entsprechende Anzeige oben rechts im Bild eingefügt. Anschließend kann man diese an die passende Stelle im Bild ziehen und evtl. in der Breite verändern.

> Für eine leichtere Positionierung ist eine "Snap to Grid" Option eingebaut. Diese ist standardmäßig auf 10px eingestellt.  

![Start](/docs/images/SHMI_RI_02.png)

#### Folgende Darstellungsmöglichkeiten (Mini-Panels) sind aktuell vorhanden
- Digital:
  - An / Aus ("LED") inkl. Timestamp
- Analog:
  - Meter
  - Sparkline (Kurve)
  - Gauge
  - Level mit Wertanzeige (vertikal z.B: als Füllstand für Tanks, frei skalierbar)
  
#### Speichern / Laden / Löschen der Mini-Panels

##### Speichern
Ein Speichern der Elemente ist nicht notwendig.

Sobald diese postioniert oder deren Größe verändert wurde, werden Position und die Größe der Anzeigen werden im Local-Storage des Browser gespeichert. Für jedes Element wird ein entsprechender Eintrag gespeichert.

##### Laden
Beim Laden der Seite werden die Elemente automatisch wieder angezeigt.

##### Löschen
Zum Löschen eines Elementes dieses in den Einstellungen wieder abwählen.

#### Direkte Animation im Bild (nur SVG):

> Momentan nur DI/DO und Analog als Wert

Dem Element eine entsprechende ID (bei Inkscape: "Kennung") geben.  
Schema: `SHMI_Dxx_D`  
Dxx = Digitaler-Datenpunkt

Wird als Farbe ausgegeben:
- 0 = schwarz
- 1 = grün
- 2 = orange (warning)
- 4 = rot (alert)

Schema: `SHMI_Axx_A`  
Axx = Analoger-Datenpunkt

Wird als Text ausgegeben.

![Start](/docs/images/SHMI_Inkscape_1.png)

Ergebnis im Betrieb:

![Start](/docs/images/SHMI_RI_03.png)

Design und Farben stehen noch nicht fest!


### Beschriftung der Oberfläche

Die Texte für die Beschriftung der Oberflächje befinden sich in der Datei:  
`lng/de.json`

Die Oberfläche ist noch nicht vollständig übersetzt.

```json
{
"DI":"Digitaleingänge",
"DO":"Digitalausgänge",
"AI":"Analogeingänge",
"AO":"Analogausgänge",
"Prefs":"Einstellungen"
}
```

### Logo

Die Datei `pict/logo.svg` gegen ein eigenes SVG-Bild ersetzen.

### Design der Oberfläche

Die Datei `css/bootstrap.min.css` gegen die entsprechende Theme-Datei austauschen.

> :warning: Dadurch können sich evtl. die Anzeigen im Fließbild verschieben

Für ein anders Design, die Datei `css/_SGMI_glow.css` umbenennen in `css/SGMI_glow.css`

![Start](/docs/images/SHMI_index_03.png)  

#### Icons

...

 ___
## Diskussion / Vorschläge

## ToDo

Reihenfolge entspricht nicht der Priorität:

#### Allgemein

- [ ] Online-Demo
- [x] I/O Farben ändern um Fehler und Warnungen besser darstellen zu können
- [x] Bibliotheken aktualisieren
- [x] Auf die aktuelle Bootstrap Version 4 aktualisieren
- [ ] Logo: Fallback auf PNG
- [x] Live-Bit von Steuerung in Schnittstelle (visualisieren)
- [ ] Meldungen von Steuerung ausgeben (Alarm-, Warn- Betriebsmeldungen)
- [ ] Einstellungen lokal speichern
- [ ] Im/Export der Einstellungen
- [x] CSS zusammenfassen
- [x] Dateien vollständig hochladen
- [ ] Wechsel der Anzeigensprache über die Oberfläche
- [x] Beschriftungen für Datenpunkte und Oberfläche in einzelne Dateien auftrennen
- [ ] Fonts lokal speichern und abfragen
- [ ] Dokumentation der Quelltexte überarbeiten
- [ ] Dokumentation als Wiki
- [ ] Minimierte Version aller Dateien
- [ ] Steuern von Werten (erst wenn der Rest stabil läuft)
- [ ] Quelltext aufräumen - das Ganze war ein Versuchs-Projekt von 2014 mit viel Copy & Paste und überflüssigen Code ...

#### Übersicht

- [ ] Variable Anzahl an Status-Seiten

##### Analog
- [ ] Skalierung Analog-Werte
- [x] Peak-Hold für Analog-Anzeige
- [X] Einstellung für die Haltezeit / Peak-Hold
- [x] Analog-Anzeige optimieren
- [X] Einstellung des Updateintervalls (Digital / Analog getrennt)

##### Digital

- [X] Zeit-Anzeige für letzte Änderzung
- [X] Einstellung des Updateintervalls (Digital / Analog getrennt)

#### Recorder

- [x] Recorder an die aktuellen Bibliotheks-Versionen anpassen und optimieren
- [ ] Oberfläche optimieren
- [ ] Evtl. Wechsel von Flot-Chart auf Chart.js (wegen Größe noch abklären)
- [ ] Zeit-Format in CSV ändern (-> Timestamp)
- [x] Mehr Statistik Funktionen
- [ ] Vorfilter für Analog-Werte (Lowpass)
- [ ] Trigger
- [x] Zeitliche Kompensation der Mittelwerte
- [ ] Zeitachse an Timestamp aus Schnittstelle anpassen
- [ ] evtl. Messwertinterpolation bei fehlenden oder ungültigen Messerten (optional)

#### Kurven (noch nicht vorhanden)
- [ ] D/A getrennt
- [ ] Berechnungen zwischen den Kurven (Differenz, Summe usw.)
- [ ] Trigger

#### Fließbilder

- [x] Werte in Bild anzeigen
- [ ] Design der Anzeigen überarbeiten
- [ ] Anzeigen rotierbar (90°) machen
- [ ] mehr Darstellungsmöglichkeiten (Gauge, nur Werte, Panel mit allen Daten)
- [ ] Animation (Färbung) der SVG-Bilder
- [ ] Zusätzliche Datenpunkte für die Animation (z.B. um geschaltete Wege darzustellen)

## Benutzte Bibliotheken

- [jQuery](https://jquery.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Flot](http://www.flotcharts.org/)
- [Moment.js](https://momentjs.com/)
- [Peity](http://benpickles.github.io/peity/)
- [Simple Statistics](https://simplestatistics.org/)
- [Select2](https://select2.org/)
- [Clayfy](https://github.com/aewebsolutions/clayfy)

## Author
Thorsten Willert

[Homepage](http://www.thorsten-willert.de/)

## Lizenz
Das ganze steht unter der [MIT](https://github.com/THWillert/SHMI/blob/master/LICENSE) Lizenz.

### Weitere
- R&I Fließbild (RI_01.svg): [Von Con-struct - Eigenes Werk, CC BY-SA 3.0](https://commons.wikimedia.org/w/index.php?curid=18266732)

- Bootstrap Theme: [Von Thomas Park / Bootswatch, MIT](https://github.com/thomaspark/bootswatch)
