const display = require('display');

const displayWidth = display.width();
const displayHeight = display.height();

const bgColor = BRUCE_BGCOLOR;
const priColor = BRUCE_PRICOLOR;
const secColor = BRUCE_SECCOLOR;

function Key(keyType, outline, show) {
    this.keyType = keyType;
    this.outline = outline;
    this.show = show;
    this.pins = [];

    const pinCount = parseInt(outline[0], 10);
    if (show === "decode") {
        for (var i = 0; i < pinCount; i++) {
            this.pins.push(0);
        }
    } else {
        for (var i = 0; i < pinCount; i++) {
            this.pins.push(Math.floor(Math.random() * 10));
        }
    }

    this.load = function() {
        const savedData = storageRead("key_data");
        if (savedData) {
            const data = JSON.parse(savedData);
            this.keyType = data.keyType;
            this.outline = data.outline;
            this.show = data.show;
            this.pins = data.pins;
        }
    };

    this.save = function() {
        const data = {
            keyType: this.keyType,
            outline: this.outline,
            show: this.show,
            pins: this.pins
        };
        storageWrite("key_data", JSON.stringify(data));
    };

    this.updatePins = function() {
        const pinCount = parseInt(outline[0], 10);
        this.pins = [];
        for (var i = 0; i < pinCount; i++) {
            this.pins.push(Math.floor(Math.random() * 10));
        }
        this.save();
    };

    this.draw = function() {
        fillScreen(bgColor);
        display.drawRoundRect(1, 1, displayWidth-2, displayHeight-2, 4, priColor);
        setTextSize(2);
        drawString(this.keyType + " - " + this.outline, 10, 10);
        drawPinsWithUnderline(this.pins, selectedPinIndex, this.show);
    };
}

const dipShapes = {
    0: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    1: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    2: [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1],
    3: [1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1],
    4: [1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 3, 2, 1],
    5: [1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 4, 3, 2, 1],
    6: [1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 5, 4, 3, 2, 1],
    7: [1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7, 6, 5, 4, 3, 2, 1],
    8: [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    9: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
};

function drawKeyShape(x, y, width, height, color, pinCount, pins) {
    const bodyHeight = height * 2;
    const notchSpacing = width / (pinCount + 1);
    const pinOffset = 3;

    for (var px = Math.round(x); px <= Math.round(x + width); px++) {
        var py = y;
        for (var i = 0; i < pinCount; i++) {
            const pinValue = pins && pins[i];
            const dipShape = dipShapes[pinValue];
            if (dipShape) {
                const dipWidth = dipShape.length;
                const pinCenter = Math.round(x + (i + 1) * notchSpacing + pinOffset * i);
                const dipStart = pinCenter - Math.floor(dipWidth / 2);
                const dipEnd = pinCenter + Math.floor(dipWidth / 2);
                if (px >= dipStart && px < dipEnd) {
                    const dipIdx = px - dipStart;
                    py = y + dipShape[dipIdx];
                    break;
                }
            }
        }
        display.drawPixel(px, py, color);
    }

    const bottomEdgeOffset = 10;
    const rightX = x + width;
    const topY = y;
    const bottomY = y + bodyHeight + bottomEdgeOffset;

    const diagLength = 21;
    const diagTopX = rightX + diagLength;
    const diagTopY = topY + diagLength;
    const diagBottomX = rightX + diagLength;
    const diagBottomY = bottomY - diagLength;

    display.drawLine(rightX, topY, diagTopX, diagTopY, color);
    display.drawLine(rightX, bottomY, diagBottomX, diagBottomY, color);
    display.drawLine(diagTopX, diagTopY, diagBottomX, diagBottomY, color);
    display.drawLine(x, bottomY, rightX, bottomY, color);
}

function drawPinsWithUnderline(pins, selectedPinIndex, showMode) {
    const pinSpacing = 30;
    const y = 55;
    const underlineY = y + 15;
    const totalWidth = pinSpacing * pins.length - pinSpacing / 2;
    const startX = (displayWidth - totalWidth) / 2;

    for (var i = 0; i < pins.length; i++) {
        const x = startX + i * pinSpacing;
        drawString(pins[i].toString(), x, y);
        if (showMode !== "random" && typeof selectedPinIndex !== "undefined" && i === selectedPinIndex) {
            display.drawRect(x - 1, underlineY, 12, 2, secColor);
        }
    }

    const keyY = y + 30;
    drawKeyShape(startX - 27, keyY, totalWidth + 40, 20, priColor, pins.length, pins);
}

function refreshKeyDisplay(key) {
    if (key.show === "random") {
        key.updatePins();
    }
    key.draw();
}

var key = null;
var selectedPinIndex = 0;

function chooseAndCreateKey() {
    const keyType = dialogChoice({
        ["Titan"]: "Titan",
        ["Best SFIC"]: "Best SFIC"
    });

    const outline = dialogChoice({
        ["5 pins"]: "5 pins",
        ["6 pins"]: "6 pins",
        ["7 pins"]: "7 pins"
    });

    const show = dialogChoice({
        ["Decode"]: "decode",
        ["Random"]: "random"
    });

    key = new Key(keyType, outline, show);
    key.save();
    refreshKeyDisplay(key);
}

if (!key) {
    chooseAndCreateKey();
}

while (true) {
    if (getSelPress()) {
        if (key.show === "random") {
            chooseAndCreateKey();
        } else {
            selectedPinIndex = (selectedPinIndex + 1) % key.pins.length;
            key.draw();
        }
    }

    if (getNextPress()) {
        if (key.show === "random") {
            refreshKeyDisplay(key);
        } else if (selectedPinIndex !== null) {
            key.pins[selectedPinIndex] = Math.min(9, key.pins[selectedPinIndex] + 1);
            key.save();
            key.draw();
        }
    }

    if (getPrevPress()) {
        if (key.show !== "random" && selectedPinIndex !== null) {
            key.pins[selectedPinIndex] = Math.max(0, key.pins[selectedPinIndex] - 1);
            key.save();
            key.draw();
        }
    }

    if (getEscPress()) {
        break;
    }
}