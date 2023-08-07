
> Diese Seite bei [https://calliope-net.github.io/i2c-uhr-stellen/](https://calliope-net.github.io/i2c-uhr-stellen/) öffnen

### i2c Module

* [Grove - 16x2 LCD](https://wiki.seeedstudio.com/Grove-16x2_LCD_Series/)
* [Grove - High Precision RTC (Real Time Clock)](https://wiki.seeedstudio.com/Grove_High_Precision_RTC/)
<!--
![](https://files.seeedstudio.com/wiki/Grove-16x2_LCD_Series/img/main.jpg)
![](https://files.seeedstudio.com/wiki/Grove-High_Precision_RTC/img/Grove-High_Precision_RTC.jpg)
-->
### Dieses Projekt importieren, mit Calliope testen, bearbeiten.

Um dieses Repository in MakeCode zu importieren.

* öffne [https://makecode.calliope.cc](https://makecode.calliope.cc)
* klicke auf **Importieren** und dann auf **Importiere URL**
* kopiere die folgende **URL des Projekts** in die Zwischenablage
* **https://github.com/calliope-net/i2c-uhr-stellen**
* füge sie auf der MakeCode Webseite ein und klicke auf **Los geht's!**

### Bedienung

> Nur wenn ein LCD Modul mit RGB Hintergrundbeleuchtung angeschlossen ist, wird diese mit **A+B geklickt** an geschaltet.

* das Programm hat 3 Zustände (Variable iStatus):
  * 1 Anzeige Datum und Zeit (RGB LED aus)
  * 2 Uhr stellen (RGB LED blau)
  * 3 Register anzeigen und Offset stellen (RGB LED gelb)
* die Umschaltung erfolgt mit **A+B halten**, zurück zu 1 geht es immer mit **A+B geklickt**
* im Status 1 Anzeige Datum und Zeit
  * **A geklickt** zeigt auf der 25 LED Matrix binär das Datum an
  * **B geklickt** zeigt auf der 25 LED Matrix binär die Zeit an
  * **A+B geklickt** RGB Hintergrundbeleuchtung grün, rot bei Fehler OscillatorStop
    * auch die RGB LED wird grün oder rot, der Fehler wird gelöscht, wenn die Sekunde neu gestellt wird
  * **A+B halten** → Status-2
* im Status 2 Uhr stellen (RGB LED blau)
  * Register: 0-Sekunde 1-Minute 2-Stunde 3-Tag 4-Wochentag 5-Monat 6-Jahr (Variable iReg)
  * am Anfang ist 2-Stunde eingestellt
  * **A geklickt** ändert den Wert im eingestelllten Register um -1 (z.B. Stunde -1)
  * **B geklickt** ändert den Wert im eingestelllten Register um +1 (z.B. Stunde +1)
  * **A halten** schaltet um auf ein anderes Register -1 (z.B. von 2-Stunde auf 1-Minute)
  * **B halten** schaltet um auf ein anderes Register +1 (z.B. von 2-Stunde auf 3-Tag)
  * **A+B geklickt** → Status-1
    * nur wenn Register 0-Sekunde eingestellt ist, wird bei **A+B geklickt** die Sekunde auf 0 gestellt
  * **A+B halten**   → Status-3
* im Status 3 Register anzeigen und Offset stellen (RGB LED gelb)
  * **A geklickt** ändert den Wert im Offset Register um -1
  * **B geklickt** ändert den Wert im Offset Register um +1
    * Werte von -64 bis +63 dienen zur Korrektur, wenn die Uhr falsch geht
  * **A+B geklickt** → Status-1

#### Metadaten (verwendet für Suche, Rendering)

* Calliope mini
* i2c
