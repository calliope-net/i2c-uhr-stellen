function zeigeZeitRegister () {
    lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 1, 1, 1, lcd16x2rgb.lcd16x2_text(bit.formatNumber(iReg, bit.eLength.HEX_F)))
    if (bit.between(iReg, 0, 6)) {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 1, 0, 0, lcd16x2rgb.lcd16x2_text("smHdwMy".charAt(iReg)))
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 1, 12, 13, lcd16x2rgb.lcd16x2_text(bit.formatNumber(rtcpcf85063tp.getDateTimeArray()[iReg], bit.eLength.HEX_FF)))
    }
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    if (iStatus == 2) {
        rtcpcf85063tp.addDateTime(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51), iReg, -1)
        rtcpcf85063tp.readDateTime(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51))
        zeigeZeit()
        zeigeZeitRegister()
    } else if (iStatus == 3) {
        if (iOffset > -64) {
            iOffset += -1
            rtcpcf85063tp.writeRegister(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51), rtcpcf85063tp.eControl.Control_1, bit.bitwise(iOffset, bit.eBit.AND, 127))
            zeigeControlRegister()
        }
    } else {
        i25LED = 1
    }
})
function zeigeZeit () {
    if (bCLK) {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 0, 15, 15, lcd16x2rgb.lcd16x2_text(String.fromCharCode(233)))
    }
    lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 0, 0, 12, lcd16x2rgb.lcd16x2_text(rtcpcf85063tp.getDate(rtcpcf85063tp.ePart.mit, rtcpcf85063tp.ePart.mit)))
    lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 1, 3, 11, lcd16x2rgb.lcd16x2_text(rtcpcf85063tp.getTime(rtcpcf85063tp.ePart.mit)))
    if (i25LED == 1) {
        rtcpcf85063tp.anzeige25LED(rtcpcf85063tp.e25LED.Datum)
    } else if (i25LED == 2) {
        rtcpcf85063tp.anzeige25LED(rtcpcf85063tp.e25LED.Zeit)
    }
}
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    if (iStatus == 2) {
        if (iReg == 0) {
            rtcpcf85063tp.writeDateTime(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51), rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Sekunde), [0])
        }
        lcd16x2rgb.clearScreen(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2))
        lcd16x2rgb.setDisplay(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), true, false)
        iStatus = 1
        basic.turnRgbLedOff()
    } else if (iStatus == 3) {
        lcd16x2rgb.clearScreen(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2))
        lcd16x2rgb.setDisplay(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), true, false)
        iStatus = 1
        basic.turnRgbLedOff()
    } else {
        initRGB()
    }
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    if (iStatus == 2) {
        rtcpcf85063tp.addDateTime(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51), iReg, 1)
        rtcpcf85063tp.readDateTime(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51))
        zeigeZeit()
        zeigeZeitRegister()
    } else if (iStatus == 3) {
        if (iOffset < 63) {
            iOffset += 1
            rtcpcf85063tp.writeRegister(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51), rtcpcf85063tp.eControl.Control_1, bit.bitwise(iOffset, bit.eBit.AND, 127))
            zeigeControlRegister()
        }
    } else {
        i25LED = 2
    }
})
pins.onPulsed(DigitalPin.P2, PulseValue.Low, function () {
    if (bCLK && iStatus == 1) {
        rtcpcf85063tp.readDateTime(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51))
        zeigeZeit()
    } else if (!(bCLK) && iStatus == 1) {
        bCLK = true
    }
})
function zeigeControlRegister () {
    lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 0, 0, 7, lcd16x2rgb.lcd16x2_text(bit.formatNumber(rtcpcf85063tp.readRegister(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51), rtcpcf85063tp.eControl.Control_1), bit.eLength.BIN_11111111)))
    lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 1, 0, 7, lcd16x2rgb.lcd16x2_text(bit.formatNumber(rtcpcf85063tp.readRegister(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51), rtcpcf85063tp.eControl.Control_2), bit.eLength.BIN_11111111)))
    lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 1, 10, 14, lcd16x2rgb.lcd16x2_text(bit.formatNumber(rtcpcf85063tp.readRegister(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51), rtcpcf85063tp.eControl.RAM_byte), bit.eLength.HEX_FF)), lcd16x2rgb.eAlign.right)
    lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 0, 13, 14, lcd16x2rgb.lcd16x2_text(bit.formatNumber(rtcpcf85063tp.readRegister(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51), rtcpcf85063tp.eControl.Offset), bit.eLength.HEX_FF)), lcd16x2rgb.eAlign.right)
    lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 0, 9, 11, bit.sign(rtcpcf85063tp.readRegister(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51), rtcpcf85063tp.eControl.Offset), 6), lcd16x2rgb.eAlign.right)
}
function initRGB () {
    lcd16x2rgb.initRGB(lcd16x2rgb.lcd16x2rgb_eADDR(lcd16x2rgb.eADDR_RGB.RGB_16x2_V5))
    rtcpcf85063tp.readDateTime(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51))
    if (rtcpcf85063tp.getOscillatorStop()) {
        lcd16x2rgb.setRGB1(lcd16x2rgb.lcd16x2rgb_eADDR(lcd16x2rgb.eADDR_RGB.RGB_16x2_V5), 0xff0000)
        basic.setLedColor(0xff0000)
    } else {
        lcd16x2rgb.setRGB1(lcd16x2rgb.lcd16x2rgb_eADDR(lcd16x2rgb.eADDR_RGB.RGB_16x2_V5), 0x00ff00)
        basic.setLedColor(0x00ff00)
    }
}
input.onButtonEvent(Button.A, ButtonEvent.Hold, function () {
    if (!(input.buttonIsPressed(Button.B))) {
        if (iStatus == 2 && iReg > 0) {
            iReg += -1
            zeigeZeitRegister()
        }
    }
})
input.onButtonEvent(Button.B, ButtonEvent.Hold, function () {
    if (!(input.buttonIsPressed(Button.A))) {
        if (iStatus == 2 && iReg < 6) {
            iReg += 1
            zeigeZeitRegister()
        }
    }
})
input.onButtonEvent(Button.AB, ButtonEvent.Hold, function () {
    if (iStatus == 1) {
        rtcpcf85063tp.initRegister(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51))
        lcd16x2rgb.clearScreen(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2))
        lcd16x2rgb.setDisplay(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), true, true, true)
        basic.setLedColor(0x0000ff)
        iStatus = 2
        zeigeZeit()
        zeigeZeitRegister()
    } else if (iStatus == 2) {
        lcd16x2rgb.clearScreen(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2))
        lcd16x2rgb.setDisplay(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), true, true, true)
        basic.setLedColor(0xffff00)
        iStatus = 3
        iOffset = bit.sign(rtcpcf85063tp.readRegister(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51), rtcpcf85063tp.eControl.Offset), 6)
        zeigeControlRegister()
    }
})
let iOffset = 0
let iStatus = 0
let iReg = 0
let bCLK = false
let i25LED = 0
i25LED = 0
bCLK = false
iReg = rtcpcf85063tp.rtcpcf85063tp_eRegister(rtcpcf85063tp.eRegister.Stunde)
lcd16x2rgb.initLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2))
iStatus = 1
loops.everyInterval(1000, function () {
    if (!(bCLK) && iStatus == 1) {
        rtcpcf85063tp.readDateTime(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51))
        zeigeZeit()
    }
})
