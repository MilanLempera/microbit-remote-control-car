function readButton () {
    buttonNumber = 0
    buttonValue = pins.analogReadPin(AnalogPin.P2)
    if (buttonValue < 256) {
        buttonNumber = 1
    } else {
        if (buttonValue < 597) {
            buttonNumber = 2
        } else {
            if (buttonValue < 725) {
                buttonNumber = 3
            } else {
                if (buttonValue < 793) {
                    buttonNumber = 4
                } else {
                    if (buttonValue < 836) {
                        buttonNumber = 5
                    } else {
                        if (buttonValue < 938) {
                            buttonNumber = 6
                        }
                    }
                }
            }
        }
    }
}
function analogToDirection (value: number) {
    if (value < 400) {
        return -1
    }
    if (value > 600) {
        return 1
    }
    return 0
}
function joyStickDirection () {
    xInput = analogToDirection(pins.analogReadPin(AnalogPin.P0))
    yInput = analogToDirection(pins.analogReadPin(AnalogPin.P1))
    if (xInput == 0 && yInput == 0) {
        return undefined
    }
    const coordsString = [xInput, yInput].join(',') as keyof typeof directionMap
return coordsToDirection(coordsString)
}
let direction = 0
let buttonValue = 0
let buttonNumber = 0
radio.setGroup(1)
let xInput = 0
let yInput = 0
const directionMap = {
    '-1,0': ArrowNames.West,
    '-1,1': ArrowNames.NorthWest,
    '0,1': ArrowNames.North,
    '1,1': ArrowNames.NorthEast,
    '1,0': ArrowNames.East,
    '1,-1': ArrowNames.SouthEast,
    '0,-1': ArrowNames.South,
    '-1,-1': ArrowNames.SouthWest,
}
function coordsToDirection(coordsString: keyof typeof directionMap) {
    return directionMap[coordsString]
}
buttonNumber = 0
basic.showIcon(IconNames.SmallSquare)
basic.showIcon(IconNames.Square)
basic.clearScreen()
basic.forever(function () {
    direction = joyStickDirection()
    if (direction != undefined) {
        radio.sendNumber(direction)
        basic.showArrow(direction)
    }
    readButton()
    if (buttonNumber > 0) {
        radio.sendNumber(10 + buttonNumber)
        basic.showNumber(buttonNumber)
    }
    if (direction == undefined && buttonNumber == 0) {
        radio.sendString("stop")
        basic.showIcon(IconNames.SmallDiamond)
    }
})
