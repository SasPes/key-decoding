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

    var pinCount = parseInt(outline[0], 10);
    if (show === "decode") {
        for (var i = 0; i < pinCount; i++) {
            this.pins.push(0);
        }
    } else {
        for (var i = 0; i < pinCount; i++) {
            this.pins.push(Math.floor(Math.random() * 10));
        }
    }

    this.load = function () {
        var savedData = storageRead("key_data");
        if (savedData) {
            var data = JSON.parse(savedData);
            this.keyType = data.keyType;
            this.outline = data.outline;
            this.show = data.show;
            this.pins = data.pins;
        }
    };

    this.save = function () {
        var data = {
            keyType: this.keyType,
            outline: this.outline,
            show: this.show,
            pins: this.pins
        };
        storageWrite("key_data", JSON.stringify(data));
    };

    this.updatePins = function () {
        var pinCount = parseInt(outline[0], 10);
        this.pins = [];
        for (var i = 0; i < pinCount; i++) {
            this.pins.push(Math.floor(Math.random() * 10));
        }
        this.save();
    };

    this.draw = function () {
        fillScreen(bgColor);
        display.drawRoundRect(1, 1, displayWidth - 2, displayHeight - 2, 4, priColor);
        setTextSize(2);
        drawString(this.keyType + " - " + this.outline, 10, 10);
        drawPinsWithUnderline(this.pins, selectedPinIndex, this.show);
    };
}

function generateDipShapes() {
    var dipShapes = {};
    var maxWidth = 32;
    var flatWidth = 2;
    var flatTopWidth = 2; // Width of flat top section
    var maxKeyCut = 8;

    for (var cut = 0; cut <= maxKeyCut; cut++) {
        var shape = [];
        var centerIndex = Math.floor(maxWidth / 2);
        var dipDepth = cut * 3 + 2;

        for (var i = 0; i < maxWidth; i++) {
            var distanceFromCenter = Math.abs(i - centerIndex);

            if (distanceFromCenter <= flatWidth) {
                // Flat bottom section
                shape[i] = dipDepth;
            } else if (distanceFromCenter >= (maxWidth / 2) - flatTopWidth && distanceFromCenter < maxWidth / 2) {
                // Flat top section - positioned just before the edge
                var minConnectingHeight = Math.min(3, dipDepth * 0.2);
                shape[i] = minConnectingHeight;
            } else {
                // Calculate smooth slope between flat bottom and flat top
                var slopeDistance = distanceFromCenter - flatWidth;
                var maxSlope = (maxWidth / 2) - flatWidth - flatTopWidth;
                var slopeRatio = slopeDistance / maxSlope;

                var minConnectingHeight = Math.min(3, dipDepth * 0.2);
                var depth = dipDepth * (1 - slopeRatio) + minConnectingHeight * slopeRatio;
                shape[i] = Math.max(minConnectingHeight, Math.round(depth));
            }
        }

        dipShapes[cut] = shape;
    }

    return dipShapes;
}

// Pin dip shapes for values 0-8
const dipShapes = generateDipShapes();

function drawKeyShape(x, y, width, height, color, pinCount, pins) {
    var notchSpacing = width / (pinCount + 1);

    // Add a pinOffset to shift each pin's start position right
    var pinOffset = 5; // adjust as needed

    for (var px = Math.round(x); px <= Math.round(x + width); px++) {
        var py = y;
        for (var i = 0; i < pinCount; i++) {
            var pinValue = pins && pins[i];
            var dipShape = dipShapes[pinValue];
            if (dipShape) {
                var dipWidth = dipShape.length;
                // Shift pinCenter right by pinOffset * i
                var pinCenter = Math.round(x + (i + 1) * notchSpacing + pinOffset * i);
                var dipStart = pinCenter - Math.floor(dipWidth / 2);
                var dipEnd = pinCenter + Math.floor(dipWidth / 2);
                if (px >= dipStart && px < dipEnd) {
                    var dipIdx = px - dipStart;
                    py = y + dipShape[dipIdx];
                    break;
                }
            }
        }
        display.drawPixel(px, py, color);
    }

    // Calculate end points for diagonals
    var shiftX = 15; // increased shift amount to move further right

    var rightX = x + width + shiftX;
    var topY = y;
    var bottomY = y + height;

    var diagLength = 30;
    var diagTopX = rightX + diagLength;
    var diagTopY = topY + diagLength;
    var diagBottomX = rightX + diagLength;
    var diagBottomY = bottomY - diagLength;

    // Draw diagonals
    // display.drawLine(rightX, topY, diagTopX, diagTopY, color);       // top-right diagonal
    display.drawLine(rightX, bottomY, diagBottomX, diagBottomY, color); // bottom-right diagonal

    // Draw vertical connector
    // display.drawLine(diagTopX, diagTopY, diagBottomX, diagBottomY, color);

    // Draw straight bottom edge
    display.drawLine(x, bottomY, rightX, bottomY, color);
}

function drawPinsWithUnderline(pins, selectedPinIndex, showMode) {
    var pinSpacing = 25;
    var y = 55;
    var underlineY = y + 15;
    var totalWidth = pinSpacing * pins.length - pinSpacing / 2;
    var startX = (displayWidth - totalWidth) / 2; // Center pins

    for (var i = 0; i < pins.length; i++) {
        var x = startX + i * pinSpacing;
        drawString(pins[i].toString(), x, y);
        if (showMode !== "random" && typeof selectedPinIndex !== "undefined" && i === selectedPinIndex) {
            display.drawRect(x - 1, underlineY, 12, 2, secColor);
        }
    }

    // Draw the key shape under the pins
    var keyY = y + 30;
    drawKeyShape(startX - 27, keyY, totalWidth + 40, 66, priColor, pins.length, pins);
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
    var keyType = dialogChoice({
        ["Titan"]: "Titan",
        ["Best SFIC"]: "Best SFIC"
    });

    var outline = dialogChoice({
        ["5 pins"]: "5 pins",
        ["6 pins"]: "6 pins",
        ["7 pins"]: "7 pins"
    });

    var show = dialogChoice({
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
            key.pins[selectedPinIndex] = Math.min(8, key.pins[selectedPinIndex] + 1);
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