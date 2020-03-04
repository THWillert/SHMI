[:de: Deutsch](https://thwillert.github.io/SHMI/) [:gb: English](https://thwillert.github.io/SHMI/index_en.html)

# SHMI

> WIP - nicht für den Produktiv-Einsatz geeignet.

## Übersicht

Eine kleine, webbasierte (HTML, JavaScript und SVG) Visualisierung für SPS oder andere kleine Geräte.

Mit minimalen Aufwand können damit Werte aus einer Steuerung (oder einem anderen Programm) visualisiert werden.
Dazu sind keinerlei HTML, CSS oder JavaScript Kenntnisse nötig.

In der einfachsten Variante nur ca. 700 KB groß!

Als CDN-Version nur ca. 150 KB!

Es ist aktuell eine reine Anzeige von Werten. Eine Steuerung von Daten ist noch nicht möglich.

![Start](/docs/images/SHMI_index.png)

[Demo (statische Daten)](http://shmi.thorsten-willert.de/)

### Features

- Für die Darstellung ist nur ein Browser nötig
- Responsives Design
- Für die grundlegende Konfiguration muß nur eine JSON-Datei, als Daten-Schnittstelle, von der Steuerung erzeugt werden
- Die Darstellung aller Werte auf der Startseite wird automatisch anhand der Daten-Schnittstelle erzeugt
- Werte können in Kurven dargestellt, aufgezeichnet und als CSV-Datei gespeichert werden
![Start](/docs/images/SHMI_Recorder_2.png)
- Fließbilder können per Drag und Drop mit Anzeige-Elementen (Widgets) ausgestattet werden:
![Start](/docs/images/SHMI_RI_1.png)
- Die Elemente in einem SVG-Bild können direkt animiert werden z.B.:
![Start](/docs/images/SHMI_RI_03.png)
- Design einfach per Bootstrap-Theme zu ändern (Standard-Design: [Slate](https://bootswatch.com/slate/)):
![Start](/docs/images/SHMI_index_02.png)
  oder per eigener Style-Sheets.
___

## Anleitung

[:de: Deutsch](https://thwillert.github.io/SHMI/)

[:gb: English](https://thwillert.github.io/SHMI/index_en.html)

 ___

## ToDo

Reihenfolge entspricht nicht der Priorität:

#### Allgemein

- [x] Online-Demo
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
- [ ] Zähler und Zeiten als zus#tzliche Datenpunkte
- [ ] Steuern von Werten (erst wenn der Rest stabil läuft)
- [ ] Quelltext aufräumen - das Ganze war ein Versuchs-Projekt von 2014 mit viel Copy & Paste und überflüssigen Code ...

#### Übersicht

- [ ] Variable Anzahl an Status-Seiten
- [ ] Unbenutzte Cards ausblenden

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
- [x] Design der Anzeigen überarbeiten
- [ ] Anzeigen rotierbar (90°) machen
- [ ] mehr Darstellungsmöglichkeiten (Gauge, nur Werte, Panel mit allen Daten)
- [x] Animation (Färbung) der SVG-Bilder
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
