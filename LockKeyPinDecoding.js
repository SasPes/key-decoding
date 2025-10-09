const display = require('display');
const dialog = require("dialog");
const storage = require("storage");

const displayWidth = display.width();
const displayHeight = display.height();

const bgColor = BRUCE_BGCOLOR;
const priColor = BRUCE_PRICOLOR;
const secColor = BRUCE_SECCOLOR;

var keys = {
    Titan: {
        outlines: ["5 pins", "6 pins"],
        pinSpacing: 31,
        maxKeyCut: 9,
        flatSpotWidth: 5,
        edgeOffsetX: 0,
        edgeOffsetY: 0
    },
    Kwikset: {
        outlines: ["5 pins"],
        pinSpacing: 30,
        maxKeyCut: 7,
        flatSpotWidth: 10,
        edgeOffsetX: 15,
        edgeOffsetY: -3
    },
    Master: {
        outlines: ["4 pins", "5 pins"],
        pinSpacing: 30,
        maxKeyCut: 7,
        flatSpotWidth: 5,
        edgeOffsetX: 0,
        edgeOffsetY: 0
    },
    Schlage: {
        outlines: ["5 pins", "6 pins"],
        pinSpacing: 29,
        maxKeyCut: 9,
        flatSpotWidth: 5,
        edgeOffsetX: 0,
        edgeOffsetY: 0
    },
    Yale: {
        outlines: ["5 pins"],
        pinSpacing: 28,
        maxKeyCut: 9,
        flatSpotWidth: 5,
        edgeOffsetX: 0,
        edgeOffsetY: 0
    },
    Best: {
        outlines: ["7 pins"],
        pinSpacing: 26,
        maxKeyCut: 8,
        flatSpotWidth: 5,
        edgeOffsetX: 0,
        edgeOffsetY: 0
    }
};

function Key(type, outline, show) {
    this.type = type;
    this.outline = outline;
    this.show = show;
    this.pins = [];

    // Initialize pins
    if (typeof outline === "string" && typeof show === "string") {
        var pinCount = parseInt(outline[0], 10);
        if (!isNaN(pinCount)) {
            if (show === "decode") {
                for (var i = 0; i < pinCount; i++) {
                    this.pins.push(0);
                }
            } else {
                for (var i = 0; i < pinCount; i++) {
                    var maxKeyCut = (keys[this.type] && keys[this.type].maxKeyCut) || 9;
                    this.pins.push(Math.floor(Math.random() * maxKeyCut - 1) + 1);
                }
            }
        }
    }

    this.updatePins = function () {
        var pinCount = parseInt(outline[0], 10);
        this.pins = [];
        for (var i = 0; i < pinCount; i++) {
            var maxKeyCut = (keys[this.type] && keys[this.type].maxKeyCut) || 9;
            this.pins.push(Math.floor(Math.random() * maxKeyCut - 1) + 1);
        }
    };

    this.draw = function () {
        var numberOfActions = 2; // Save, Load
        if (selectedPinIndex >= this.pins.length + numberOfActions) {
            selectedPinIndex = 0;
        }

        fillScreen(bgColor);
        display.drawRoundRect(1, 1, displayWidth - 2, displayHeight - 2, 4, priColor);
        setTextSize(2);
        display.drawString(this.type + " - " + this.outline, 10, 10);

        if (this.show === "decode") {
            display.drawRoundRect(displayWidth - 65, 3, 60, 8 + numberOfActions * 24, 4, priColor);
            display.drawString("Save", displayWidth - 58, 12);
            display.drawString("Load", displayWidth - 58, 36);

            var selectedAction = selectedPinIndex - this.pins.length;
            if (selectedPinIndex >= this.pins.length) {
                display.drawRect(displayWidth - 60, 28 + selectedAction * 24, 50, 2, secColor);
            }
        }

        var pinSpacing = keys[this.type] ? keys[this.type].pinSpacing : 31;
        drawPinsWithUnderline(this.pins, selectedPinIndex, this.show, pinSpacing, this.type);
    };

    this.save = function () {
        var data = {
            type: this.type,
            outline: this.outline,
            pins: this.pins
        };
        var fileName = "/keys/key_" + this.type + "_" + this.pins.join('') + "_" + Date.now() + ".json";
        const success = storage.write(fileName, JSON.stringify(data));
        if (success) {
            dialog.success("     Key saved successfully!     " + fileName);
        }
        setTextColor(priColor);
        selectedPinIndex = 0;
        delay(2000);
    };

    this.load = function (keyData) {
        if (keyData) {
            var data = JSON.parse(keyData);
            this.type = data.type;
            this.outline = data.outline;
            this.show = "decode";
            this.pins = data.pins;
        }
        fillScreen(bgColor);
    };
}

function generateDipShapes(pinSpacing, maxKeyCut, flatSpotWidth) {
    var dipShapes = {};

    for (var cut = 0; cut < maxKeyCut; cut++) {
        var shape = [];
        var centerIndex = Math.floor(pinSpacing / 2);
        var maxDepth = cut * 3 + 2;
        var flatHalfWidth = Math.floor(flatSpotWidth / 2);

        for (var i = 0; i < pinSpacing; i++) {
            var distanceFromCenter = Math.abs(i - centerIndex);

            if (cut === 0) {
                if (distanceFromCenter <= flatSpotWidth) {
                    shape[i] = 2;
                } else {
                    shape[i] = 0;
                }
            } else {
                if (distanceFromCenter <= flatHalfWidth) {
                    shape[i] = maxDepth;
                } else {
                    var slopeDistance = distanceFromCenter - flatHalfWidth;
                    var remainingDistance = centerIndex - flatHalfWidth;
                    var depth = maxDepth - Math.floor(slopeDistance * (maxDepth - 1) / remainingDistance);
                    shape[i] = Math.max(1, depth);
                }
            }
        }

        dipShapes[cut] = shape;
    }

    return dipShapes;
}

function drawKeyShape(x, y, width, height, color, pinCount, pins, keyType) {
    var keyConfig = keys[keyType] || {};
    var pinSpacing = keyConfig.pinSpacing || 31;
    var maxKeyCut = keyConfig.maxKeyCut || 9;
    var flatSpotWidth = keyConfig.flatSpotWidth || 5;
    var edgeOffsetX = keyConfig.edgeOffsetX || 0;
    var edgeOffsetY = keyConfig.edgeOffsetY || 0;
    var dipShapes = generateDipShapes(pinSpacing, maxKeyCut, flatSpotWidth);


    for (var px = Math.round(x); px <= Math.round(x + width + pinSpacing / 2); px++) {
        var py = y;
        for (var i = 0; i < pinCount; i++) {
            var pinValue = pins && pins[i];
            var dipShape = dipShapes[pinValue];
            if (dipShape) {
                var dipWidth = dipShape.length;
                var pinCenter = Math.round(x + (i + 1) * pinSpacing);
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

    var edgeX = x + width + pinSpacing / 2 + edgeOffsetX;
    var edgeY = y + height + edgeOffsetY;
    var diagLength = 30;
    var diagBottomX = edgeX + diagLength;
    var diagBottomY = edgeY - diagLength;

    // Draw diagonals
    display.drawLine(edgeX, edgeY, diagBottomX, diagBottomY, color); // bottom-right diagonal

    // Draw straight bottom edge
    display.drawLine(x, edgeY, edgeX, edgeY, color);
}

function drawPinsWithUnderline(pins, selectedPinIndex, showMode, pinSpacing, keyType) {
    var startY = 55;
    var underlineY = startY + 15;
    var totalWidth = pinSpacing * pins.length;
    var startX = (displayWidth - totalWidth) / 2;

    var numberSize = 12;

    // Draw pins numbers
    for (var i = 0; i < pins.length; i++) {
        var pinNumberX = startX + numberSize + i * pinSpacing;
        display.drawString(pins[i].toString(), pinNumberX, startY);

        if (showMode !== "random" && typeof selectedPinIndex !== "undefined" && i === selectedPinIndex) {
            display.drawRect(pinNumberX - 1, underlineY, 12, 2, secColor);
        }
    }

    // Draw the key shape under the pins
    var keyX = startX - pinSpacing / 2;
    var keyY = startY + pinSpacing;
    drawKeyShape(keyX, keyY, totalWidth, 66, priColor, pins.length, pins, keyType);
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
    selectedPinIndex = 0;

    var keyTypeChoices = {};
    var brandNames = Object.keys(keys);
    for (var i = 0; i < brandNames.length; i++) {
        var brand = brandNames[i];
        keyTypeChoices[brand] = brand;
    }
    keyTypeChoices.Load = "Load";
    keyTypeChoices.Exit = "Exit";

    var type = dialog.choice(keyTypeChoices);
    if (!type) type = "Exit";

    var outline, show;

    if (type !== "Exit") {
        if (type === "Load") {
            key = new Key(type, "", "decode");
            key.load(storage.read(dialog.pickFile("/keys", {withFileTypes: true})))
        } else {
            var outlines = keys[String(type)].outlines || [];
            var outlineChoices = {};
            for (var j = 0; j < outlines.length; j++) {
                var o = outlines[j];
                outlineChoices[o] = o;
            }
            outlineChoices.Cancel = "Cancel";

            outline = dialog.choice(outlineChoices);
            if (!outline || outline === "Cancel") {
                return chooseAndCreateKey();
            }

            show = dialog.choice({
                Decode: "decode",
                Random: "random",
                Cancel: "Cancel"
            });
            if (!show || show === "Cancel") {
                return chooseAndCreateKey();
            }
        }
    }

    if (type !== "Load") {
        key = new Key(type, outline, show);
    }
    if (type !== "Exit") {
        refreshKeyDisplay(key);
    }
}

if (!key) {
    chooseAndCreateKey();
}

while (true) {
    if (key.type === "Exit") {
        break;
    }

    if (getSelPress()) {
        if (key.show === "random") {
            chooseAndCreateKey();
        } else {
            selectedPinIndex++;
            key.draw();
        }
    }

    if (getNextPress()) {
        if (key.show === "random") {
            refreshKeyDisplay(key);
        } else if (key.show === "decode" && selectedPinIndex !== null && selectedPinIndex < key.pins.length) {
            var maxKeyCut = (keys[key.type] && keys[key.type].maxKeyCut) || 9;
            key.pins[selectedPinIndex] = Math.min(maxKeyCut - 1, key.pins[selectedPinIndex] + 1);
            key.draw();
        } else if (selectedPinIndex === key.pins.length) { // Save action
            key.save();
            key.draw();
        } else if (selectedPinIndex === key.pins.length + 1) { // Load action
            key.load(storage.read(dialog.pickFile("/keys", {withFileTypes: true})))
            key.draw();
        }
    }

    if (getPrevPress()) {
        if (key.show === "decode" && selectedPinIndex !== null && selectedPinIndex < key.pins.length) {
            key.pins[selectedPinIndex] = Math.max(0, key.pins[selectedPinIndex] - 1);
            key.draw();
        }
    }

    if (getEscPress()) {
        chooseAndCreateKey();
    }
}