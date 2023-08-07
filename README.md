
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

### Bedienung Projekt → i2c-uhr-stellen ←

> Nur wenn ein LCD Modul mit RGB Hintergrundbeleuchtung angeschlossen ist, wird diese mit **A+B geklickt** an geschaltet.

* das Programm hat 3 Zustände (Variable iStatus):
  * *1 Anzeige Datum und Zeit* (RGB LED aus)
  * *2 Uhr stellen* (RGB LED blau)
  * *3 Register anzeigen und Offset stellen* (RGB LED gelb)
* die Umschaltung 1→2, 2→3 erfolgt mit **A+B halten**, zurück zu →1 mit **A+B geklickt**
* im Status *1 Anzeige Datum und Zeit*
  * **A geklickt** zeigt auf der 25 LED Matrix binär das Datum an (Variable i25LED = 1)
  * **B geklickt** zeigt auf der 25 LED Matrix binär die Zeit an (Variable i25LED = 2)
  * **A+B geklickt** RGB Hintergrundbeleuchtung grün, rot bei Fehler OscillatorStop
    * der Fehler wird gelöscht, wenn die Sekunde neu gestellt wird
  * **A+B halten** → Status-2
* im Status *2 Uhr stellen* (RGB LED blau)
  * Register: 0-Sekunde 1-Minute 2-Stunde 3-Tag 4-Wochentag 5-Monat 6-Jahr (Variable iReg)
  * am Anfang ist 2-Stunde eingestellt
  * **A geklickt** ändert den Wert im eingestellten Register um -1 (z.B. Stunde -1)
  * **B geklickt** ändert den Wert im eingestellten Register um +1 (z.B. Stunde +1)
  * **A halten** schaltet um auf ein anderes Register -1 (z.B. von 2-Stunde auf 1-Minute)
  * **B halten** schaltet um auf ein anderes Register +1 (z.B. von 2-Stunde auf 3-Tag)
  * **A+B geklickt** → Status-1
    * wenn Register 0-Sekunde eingestellt ist, wird die Sekunde auf 0 gestellt
  * **A+B halten**   → Status-3
* im Status *3 Register anzeigen und Offset stellen* (RGB LED gelb)
  * **A geklickt** ändert den Wert im Offset Register um -1
  * **B geklickt** ändert den Wert im Offset Register um +1
    * Werte von -64 bis +63 dienen zur Korrektur, wenn die Uhr falsch geht
  * **A+B geklickt** → Status-1

> Der Sekundentakt kann von einer **alle 1000 ms** Schleife kommen.
> Genauer geht es, wenn ein PIN mit CLK am RTC-Modul verdrahtet wird.
> Das wird erkennt und schaltet die Schleife ab (Variable bCLK). Ein Symbol wird im LCD Display angezeigt.

### 3 Erweiterungen werden automatisch mit geladen

* [https://github.com/calliope-net/bit](https://calliope-net.github.io/bit/)
* [https://github.com/calliope-net/lcd-16x2rgb](https://calliope-net.github.io/lcd-16x2rgb/)
* [https://github.com/calliope-net/rtc-pcf85063tp](https://calliope-net.github.io/rtc-pcf85063tp/)

### Updates

> Um ein Update einer Erweiterung von GitHub zu laden, klicke in der JavaScript Ansicht
> links unter dem Simulator auf den schwarzen Explorer. Dort steht der Name der Erweiterung
> vor einem Mülleimer- und einem Pfeil-Symbol. Mit dem Mülleimer wird die Erweiterung gelöscht,
> mit dem runden Pfeil nach einem Update gesucht. Danach steht dort eine Versionsnummer.

### Programmier-Beispiele, i2c-Module, Bilder, Bezugsquellen:
* [Calliope i2c Demo-Projekt mit vier i2c Modulen gleichzeitig, mit DIP-Schalter.](https://calliope-net.github.io/i2c-test/)
* [Quarz-Uhr anzeigen, stellen mit Knopf A/B, Korrektur-Register, Binär-Uhr.](https://calliope-net.github.io/i2c-uhr-stellen/)
* [Dateien der Speicherkarte anzeigen, lesen, schreiben, löschen, mit Knopf A/B.](https://calliope-net.github.io/i2c-speicherkarte-verwalten/)

#### Metadaten (verwendet für Suche, Rendering)

* Calliope mini
* i2c
