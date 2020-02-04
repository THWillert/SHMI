V0.6.2-beta ß4.02.2020

 - changed: changed the recorder axis to the right side (to see the current value better)
 - changed: writing only changed values on the status page
 - changed: increased the reading of the values to 500ms
 - added: small delay between the updates of DI, analog-level and sparklines
 - fixed: offset of the background / color of the digital I/O

V0.6.1-beta 03.02.2020

 - added: display for the time difference local / source
 - added: shows the connection status now (to the data file)
 - changed: removed some styles from the pages
 - changed: removed some unused links from the menu
 - fixed: data polling restarts after error now
 - fixed: cleaned up the HTML (W3C validator)
 - SHMI_randomdata.exe:
   - added: support for live bit and timestamp
   - changed: first AI ist now a triangle wave

V0.6.0-beta 01.02.2020

 - added: DI/DO shows the timestamp of the last change now


V0.5.0-beta 31.01.2020

 - added: more CSS-variables in SHMI_instruments.css
 - added: more data points to data.json
 - updated: design for the RI instruments
 - updated: added sample animations (color change) to the RI SVG-image
 - changed: spltted language files and changed suffix to json
 - changed: renamed randomdata.exe to SHMI_randomdata.exe and added more data-points
 - fixed: error with AO selection for RI
 
V0.4.1-beta 30.01.2020

- fixed: animation error with mixed style / attributes in svg files

V0.4.0-beta 30.01.2020

- added: direct animation (coloring) for DI/DO in the SVG-image  
- added: fallback for the RI-images SVG -> PNG -> JPG
- removed: original bootstrap css
- removed fontawesome (because of the size)

V0.3.1-beta 28.01.2020

- added new type of level-meter for analog inputs:

V0.3.0-beta 26.01.2020

- SHMI_RI_x.html
  - now you can add all datapoints as "instruments" to the P&ID
- updated all files

V0.2.3-beta 20.01.2020

- SHMI_status.html
  - added scale for analog values

V0.2.3-beta 20.01.2020

- SHMI_status.html
  - added sparklines for the analog values
  
- CSS
  - added SHMI_glow.css (if you rename it, you have the flat-design back)

V0.2.2-beta 17.01.2020

- index.htm
  - updated iframe
  
- SHMI.css
  - updated iframe
  - removed some unused selectors

- SHMI_recorder.html / SHMI_recorder.js
  - changed layout
  - changed default preferences (first analog-value viewed, SMA / 11, Zoom: Grow loosley)
  - added "collapse" to the cards:

V0.2.1-beta 16.01.2020

- fixed some errors in index.htm

V0.2.0-beta 16.01.2020

- minified all JavaScript-files
- recorder.html renamed to SHMI_recorder.html (SHMI_recorder.js)
  - updated Flot
  - added statistics curve (SMA, median or RMs)
  - added auto zoom functions
  
- status.html renamed to SHMI_status.html
- ri_01.html renamed to SHMI_RI_01.html
  - updated layout

V0.1.5-beta 12.01.2020

- SHMI_instruments.css:
  - changed trasition of the progress bars
  - changed background color of the instruments
  - optimized file
  
- SHMI.css
  - changed: shadow color on the top now the secondary color of the theme
  
- recorder.html / recorder.js
  - added: tooltip for data points
  - changed: support for curvedLines-plugin with splines-plugin
  - changed: colors of min / max markers
  - changed: BootstrapDialog.confirm updated to Bootstrap V4 modal
  - changed: Button layout
  - removed: "light" function
   
- status.html:
  - added: colors depends now of the thems (css variables)
  - added: preferences for update intervall digital values 
  - added: preferences for update intervall analog values
  - added: preferences for peak / valleys hold
  - changed: smaller spaces
  
- index.htm:
  - added: shields.io for SHMI

V0.1.4-beta 09.01.2020

- recorder.html: updated design ot the chart
- recorder.html: chart now with tooltips

V0.1.3-beta 09.01.2020

- Analog- und Digital-Anzeigen an Bootstrap angepasst:
  - Themes werden nun darauf angewandt
  - Analog-Anzeige verwendet nun die Progress-Bar

V0.1.2-beta 08.01.2020

- status.html: added peak-hold to the analog levels
- status.html: changed the analog form
- status.html: fixed error in analog-out card (collapse)
- splitted default.css into SHMI.css and SHMI_Instruments.css

V0.1.1-beta 08.01.2020

- index.htm: updated About-dialog to Bootstrap V4

V0.1-beta 08.01.2020

- first release

07.01.2020

- added peak-hold bar to html and css (not working now)
- now you can collapse all cards on the "Overview / Übersicht" page by clicking on the title
- removed glyphicons (not supported by Bootstrap 4)

05.01.2020

- uploaded to GitHub

31.03.2014

- first version
