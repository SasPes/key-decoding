const display = require('display');
const dialog = require("dialog");
const storage = require("storage");

const displayWidth = display.width();
const displayHeight = display.height();

const bgColor = BRUCE_BGCOLOR;
const priColor = BRUCE_PRICOLOR;
const secColor = BRUCE_SECCOLOR;

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
                    this.pins.push(Math.floor(Math.random() * 9) + 1);
                }
            }
        }
    }

    this.load = function () {
        var savedData = storage.read("key_data");
        if (savedData) {
            var data = JSON.parse(savedData);
            this.type = data.type;
            this.outline = data.outline;
            this.show = data.show;
            this.pins = data.pins;
        }
    };

    this.save = function () {
        var data = {
            type: this.type,
            outline: this.outline,
            show: this.show,
            pins: this.pins
        };
        storage.write("key_data", JSON.stringify(data));
    };

    this.updatePins = function () {
        var pinCount = parseInt(outline[0], 10);
        this.pins = [];
        for (var i = 0; i < pinCount; i++) {
            this.pins.push(Math.floor(Math.random() * 9));
        }
        this.save();
    };

    this.draw = function () {
        fillScreen(bgColor);
        display.drawRoundRect(1, 1, displayWidth - 2, displayHeight - 2, 4, priColor);
        setTextSize(2);
        drawString(this.type + " - " + this.outline, 10, 10);
        drawPinsWithUnderline(this.pins, selectedPinIndex, this.show);
    };
}

function generateDipShapes() {
    var dipShapes = {};
    var maxWidth = 31;
    var maxKeyCut = 8;
    var flatSpotWidth = 5;

    for (var cut = 0; cut <= maxKeyCut; cut++) {
        var shape = [];
        var centerIndex = Math.floor(maxWidth / 2);
        var maxDepth = cut * 3 + 2;
        var flatHalfWidth = Math.floor(flatSpotWidth / 2);

        for (var i = 0; i < maxWidth; i++) {
            var distanceFromCenter = Math.abs(i - centerIndex);

            if (distanceFromCenter <= flatHalfWidth) {
                // Flat spot at the bottom
                shape[i] = maxDepth;
            } else {
                // Linear slope from flat spot to edges
                var slopeDistance = distanceFromCenter - flatHalfWidth;
                var remainingDistance = centerIndex - flatHalfWidth;
                var depth = maxDepth - Math.floor(slopeDistance * (maxDepth - 1) / remainingDistance);
                shape[i] = Math.max(1, depth);
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
    var bottomY = y + height;

    var diagLength = 30;
    var diagBottomX = rightX + diagLength;
    var diagBottomY = bottomY - diagLength;

    // Draw diagonals
    display.drawLine(rightX, bottomY, diagBottomX, diagBottomY, color); // bottom-right diagonal

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
    drawKeyShape(startX - 25, keyY, totalWidth + 40, 66, priColor, pins.length, pins);
}

function refreshKeyDisplay(key) {
    if (key.show === "random") {
        key.updatePins();
    }
    key.draw();
}

var key = null;
var selectedPinIndex = 0;

var keys = {
    Titan: ["5 pins", "6 pins"],
    Kwikset: ["5 pins"],
    Master: ["4 pins", "5 pins"],
    Schlage: ["5 pins", "6 pins"],
    Yale: ["5 pins"],
    Best: ["7 pins"]
};

function chooseAndCreateKey() {
    // Build a fresh choices object so we don't mutate keys
    var keyTypeChoices = {};
    var brandNames = Object.keys(keys);
    for (var i = 0; i < brandNames.length; i++) {
        var brand = brandNames[i];
        keyTypeChoices[brand] = brand;
    }
    keyTypeChoices.Exit = "Exit";

    var type = dialog.choice(keyTypeChoices);
    if (!type) type = "Exit";

    var outline, show;

    if (type !== "Exit") {
        var outlines = keys[String(type)] || [];
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

    key = new Key(type, outline, show);
    key.save();
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
            selectedPinIndex = (selectedPinIndex + 1) % key.pins.length;
            key.draw();
        }
    }

    if (getNextPress()) {
        if (key.show === "random") {
            refreshKeyDisplay(key);
        } else if (selectedPinIndex !== null && key.show === "decode") {
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
        chooseAndCreateKey();
    }
}