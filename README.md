[:de: Deutsch](https://thwillert.github.io/SHMI/) [:gb: English](https://thwillert.github.io/SHMI/index_en.html)

# SHMI

> WIP - nicht für den Produktiv-Einsatz geeignet.

[![Total alerts](https://img.shields.io/lgtm/alerts/g/THWillert/SHMI.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/THWillert/SHMI/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/THWillert/SHMI.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/THWillert/SHMI/context:javascript)


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

## Author
Thorsten Willert

[Homepage](https://www.thorsten-willert.de/software/shmi)

## Lizenz
Das ganze steht unter der [MIT](https://github.com/THWillert/SHMI/blob/master/LICENSE) Lizenz.

### Weitere
- R&I Fließbild (RI_01.svg): [Von Con-struct - Eigenes Werk, CC BY-SA 3.0](https://commons.wikimedia.org/w/index.php?curid=18266732)

- Bootstrap Theme: [Von Thomas Park / Bootswatch, MIT](https://github.com/thomaspark/bootswatch)
