const display = require("display");
const dialog = require("dialog");
const storage = require("storage");
const keyboard = require("keyboard");

const displayWidth = display.width();
const displayHeight = display.height();

const bgColor = BRUCE_BGCOLOR;
const priColor = BRUCE_PRICOLOR;
const secColor = BRUCE_SECCOLOR;

const version = "1.15.0";

var logo = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf8, 0xff, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xfe, 0xff, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0xff, 0xf0, 0x1f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x0f, 0x00, 0x3f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x03, 0x00, 0xfc, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf8, 0x00, 0x00, 0xf0, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7c, 0x00, 0x00, 0xe0, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x3c, 0x00, 0x00, 0x80, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1e, 0x00, 0x0f, 0x80, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0f, 0xc0, 0x3f, 0x00, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x07, 0xc0, 0x3f, 0x00, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x03, 0xe0, 0x79, 0x00, 0x1c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x03, 0xe0, 0x70, 0x00, 0x1c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0xe0, 0x70, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0xe0, 0x79, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0xc0, 0x3f, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xe0, 0x01, 0xc0, 0x3f, 0x00, 0x78, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xe0, 0x00, 0x00, 0x0f, 0x00, 0x70, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xe0, 0x00, 0x00, 0x00, 0x00, 0x70, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xe0, 0x00, 0x00, 0x00, 0x00, 0x70, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xe0, 0x00, 0x00, 0x00, 0x00, 0x70, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xe0, 0x00, 0x00, 0x00, 0x00, 0x70, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xe0, 0x00, 0x00, 0x00, 0x00, 0x70, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xe0, 0x00, 0x00, 0x00, 0x00, 0x70, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0x00, 0x00, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0x00, 0x00, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0x00, 0x00, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x03, 0x00, 0x00, 0x00, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x03, 0x00, 0x00, 0x00, 0x1c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x07, 0x00, 0x00, 0x00, 0x1e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0f, 0x00, 0x00, 0x00, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xe0, 0x03, 0x1e, 0x00, 0x00, 0x80, 0x07, 0x7c, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x07, 0x3c, 0x00, 0x00, 0xc0, 0x03, 0xfe, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf8, 0x0f, 0x78, 0x00, 0x00, 0xe0, 0x01, 0xff, 0x01, 0x00, 0x00, 0x00, 0x00, 0x38, 0x0e, 0xf0, 0x01, 0x00, 0xf8, 0x00, 0xc7, 0x01, 0x00, 0x00, 0x00, 0x00, 0x38, 0x0e, 0xe0, 0x03, 0x00, 0x7c, 0x00, 0xc7, 0x01, 0x00, 0x00, 0x00, 0x00, 0xf8, 0x0f, 0xc0, 0x0f, 0x00, 0x3f, 0x00, 0xff, 0x01, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x07, 0x00, 0x1f, 0x80, 0x0f, 0x00, 0xfe, 0x00, 0x00, 0x00, 0x00, 0x00, 0xe0, 0x03, 0x00, 0x1e, 0x80, 0x07, 0x00, 0x7c, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0x00, 0x1c, 0x80, 0x03, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0x00, 0x1c, 0x80, 0x03, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0x00, 0x1c, 0x80, 0x03, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0x00, 0x1c, 0x80, 0x03, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0x00, 0x1c, 0x80, 0x03, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0x00, 0x1c, 0x80, 0x03, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0x00, 0x1c, 0x80, 0x03, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0x00, 0x1c, 0x80, 0x03, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0x00, 0x1c, 0x80, 0x03, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0xff, 0x1f, 0x1c, 0x80, 0x83, 0xff, 0x3f, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0xff, 0x1f, 0x1c, 0x80, 0x83, 0xff, 0x3f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0xff, 0x0f, 0x1c, 0x80, 0x03, 0xff, 0x1f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1c, 0x80, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1c, 0x80, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1c, 0x80, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7c, 0x80, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xfc, 0x80, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x03, 0x00, 0x00, 0x00, 0xf8, 0x81, 0x03, 0x00, 0x00, 0x00, 0xfc, 0x00, 0xf8, 0x03, 0x00, 0x00, 0x00, 0xc0, 0x81, 0x03, 0x00, 0x00, 0x00, 0xfc, 0x01, 0xf8, 0xff, 0xff, 0xff, 0x0f, 0xc0, 0x81, 0x03, 0xff, 0xff, 0xff, 0xff, 0x01, 0x1c, 0xff, 0xff, 0xff, 0x1f, 0xc0, 0x81, 0x83, 0xff, 0xff, 0xff, 0xcf, 0x03, 0x3c, 0xff, 0xff, 0xff, 0x1f, 0xc0, 0x81, 0x83, 0xff, 0xff, 0xff, 0xcf, 0x03, 0xf8, 0x07, 0x00, 0x00, 0x00, 0xc0, 0x81, 0x03, 0x00, 0x00, 0x00, 0xfe, 0x01, 0xf8, 0x03, 0x00, 0x00, 0x00, 0xf0, 0x81, 0x03, 0x00, 0x00, 0x00, 0xfc, 0x01, 0xf0, 0x01, 0x00, 0x00, 0x00, 0xf8, 0x81, 0x03, 0x00, 0x00, 0x00, 0xf8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7c, 0x80, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1c, 0x80, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1c, 0x80, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1c, 0x80, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1c, 0x80, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0xff, 0x1f, 0x1c, 0x80, 0x83, 0xff, 0x1f, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0xff, 0x1f, 0xfc, 0x80, 0x83, 0xff, 0x3f, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0xff, 0x1f, 0xf8, 0x81, 0x83, 0xff, 0x3f, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0x00, 0xe0, 0x81, 0x03, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0x00, 0xc0, 0x81, 0x03, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0x00, 0xc0, 0x81, 0x03, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0x00, 0xc0, 0x81, 0x03, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0x00, 0xc0, 0x81, 0x03, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0x00, 0xe0, 0x81, 0x03, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0x00, 0xf8, 0x81, 0x03, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0x00, 0xfc, 0x80, 0x03, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x01, 0x00, 0x1c, 0x80, 0x03, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0xe0, 0x03, 0x00, 0x1c, 0x80, 0x03, 0x00, 0x7c, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x07, 0x00, 0x1c, 0x80, 0x03, 0x00, 0xfe, 0x00, 0x00, 0x00, 0x00, 0x00, 0x78, 0x0f, 0x00, 0x1c, 0x80, 0x03, 0x00, 0xef, 0x01, 0x00, 0x00, 0x00, 0x00, 0x38, 0x0e, 0x00, 0x1c, 0x80, 0x03, 0x00, 0xc7, 0x01, 0x00, 0x00, 0x00, 0x00, 0x38, 0x0e, 0x00, 0x3c, 0x80, 0x03, 0x00, 0xc7, 0x01, 0x00, 0x00, 0x00, 0x00, 0xf8, 0x0f, 0x00, 0x7c, 0xe0, 0x03, 0x00, 0xff, 0x01, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x07, 0x00, 0x78, 0xf0, 0x01, 0x00, 0xfe, 0x00, 0x00, 0x00, 0x00, 0x00, 0xe0, 0x03, 0x00, 0xf0, 0xf8, 0x00, 0x00, 0x7c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xe0, 0x7f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x3f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x1f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).buffer;

// --- Menu icons (20x20, 1-bit, same bit order as the logo / renderBitmap) ---
var ICON_W = 20, ICON_H = 20;
var ICON_KEY = new Uint8Array([0x00, 0xf8, 0x00, 0x00, 0xfe, 0x03, 0x00, 0xff, 0x07, 0x00, 0x3f, 0x07, 0x80, 0x1f, 0x0e, 0x80, 0x1f, 0x0e, 0x80, 0x3f, 0x0f, 0x80, 0xff, 0x0f, 0x80, 0xff, 0x0f, 0x80, 0xff, 0x07, 0xc0, 0xff, 0x07, 0xe0, 0xff, 0x03, 0xf0, 0xff, 0x00, 0xf8, 0x03, 0x00, 0xfc, 0x00, 0x00, 0x7e, 0x00, 0x00, 0x7f, 0x00, 0x00, 0x1f, 0x00, 0x00, 0x1f, 0x00, 0x00, 0x0f, 0x00, 0x00]).buffer;
var ICON_VEHICLES_KEY = new Uint8Array([0x00, 0x70, 0x00, 0x00, 0xF8, 0x00, 0x00, 0xFE, 0x01, 0x00, 0x8F, 0x03, 0x00, 0x2F, 0x07, 0x80, 0x4F, 0x0E, 0x80, 0x9F, 0x0E, 0x80, 0x3F, 0x0E, 0x80, 0xFF, 0x07, 0x00, 0xFF, 0x03, 0x00, 0xFE, 0x03, 0xC0, 0xFC, 0x01, 0xE0, 0x79, 0x00, 0xF0, 0x01, 0x00, 0xF8, 0x00, 0x00, 0x7C, 0x00, 0x00, 0x3E, 0x00, 0x00, 0x1F, 0x00, 0x00, 0x0F, 0x00, 0x00, 0x07, 0x00, 0x00]).buffer;
var ICON_PADLOCK = new Uint8Array([0x00, 0x0f, 0x00, 0xc0, 0x3f, 0x00, 0xe0, 0x79, 0x00, 0x60, 0x60, 0x00, 0x70, 0xe0, 0x00, 0x30, 0xc0, 0x00, 0x30, 0xc0, 0x00, 0x30, 0xc0, 0x00, 0x30, 0xc0, 0x00, 0xf8, 0xff, 0x01, 0xf8, 0xff, 0x01, 0xf8, 0xf9, 0x01, 0xf8, 0xf9, 0x01, 0xf8, 0xf9, 0x01, 0xf8, 0xf9, 0x01, 0xf8, 0xf9, 0x01, 0xf8, 0xf9, 0x01, 0xf8, 0xff, 0x01, 0xf8, 0xff, 0x01, 0xf8, 0xff, 0x01]).buffer;
var ICON_CORE = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x1f, 0x00, 0x80, 0x20, 0x00, 0x40, 0x40, 0x00, 0x20, 0x8e, 0x00, 0x20, 0x9f, 0x00, 0x20, 0x9f, 0x00, 0x20, 0x9f, 0x00, 0x20, 0x8e, 0x00, 0x40, 0x40, 0x00, 0x80, 0x20, 0x00, 0x40, 0x5f, 0x00, 0x20, 0x8e, 0x00, 0x20, 0x9f, 0x00, 0x20, 0x9f, 0x00, 0x20, 0x9f, 0x00, 0x20, 0x8e, 0x00, 0x40, 0x40, 0x00, 0x80, 0x20, 0x00, 0x00, 0x1f, 0x00]).buffer;
var ICON_DISC = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0x00, 0xc0, 0x60, 0x00, 0x20, 0x80, 0x00, 0x10, 0x1f, 0x01, 0x88, 0x38, 0x02, 0x48, 0x78, 0x02, 0x24, 0xf8, 0x04, 0x24, 0xf8, 0x04, 0x24, 0xf8, 0x04, 0x24, 0xf8, 0x04, 0x24, 0xf8, 0x04, 0x48, 0x78, 0x02, 0x88, 0x38, 0x02, 0x10, 0x1f, 0x01, 0x20, 0x80, 0x00, 0xc0, 0x60, 0x00, 0x00, 0x1f, 0x00, 0x00, 0x00, 0x00]).buffer;
var ICON_ANGLE = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x20, 0x00, 0x00, 0xf8, 0xf9, 0x01, 0xfe, 0xff, 0x07, 0xfe, 0xff, 0x07, 0xff, 0xff, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).buffer;
var ICON_INFO = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1f, 0x00, 0xc0, 0x60, 0x00, 0x20, 0x80, 0x00, 0x10, 0x0e, 0x01, 0x08, 0x0e, 0x02, 0x08, 0x0e, 0x02, 0x04, 0x00, 0x04, 0x04, 0x0e, 0x04, 0x04, 0x0e, 0x04, 0x04, 0x0e, 0x04, 0x04, 0x0e, 0x04, 0x08, 0x0e, 0x02, 0x08, 0x0e, 0x02, 0x10, 0x0e, 0x01, 0x20, 0x80, 0x00, 0xc0, 0x60, 0x00, 0x00, 0x1f, 0x00, 0x00, 0x00, 0x00]).buffer;
var ICON_LOAD = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x06, 0x00, 0x00, 0x06, 0x00, 0x00, 0x06, 0x00, 0x00, 0x06, 0x00, 0x00, 0x06, 0x00, 0x40, 0x26, 0x00, 0xc0, 0x36, 0x00, 0x80, 0x16, 0x00, 0x00, 0x0f, 0x00, 0x00, 0x06, 0x00, 0x00, 0x06, 0x00, 0x08, 0x00, 0x01, 0x08, 0x00, 0x01, 0xf8, 0xff, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).buffer;
var ICON_EXIT = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xF8, 0x01, 0x00, 0xFC, 0x03, 0x00, 0x1C, 0x00, 0x00, 0x0C, 0x00, 0x00, 0x0C, 0x70, 0x00, 0x0C, 0xE0, 0x00, 0x0C, 0xE0, 0x01, 0x8C, 0xFF, 0x03, 0x8C, 0xFF, 0x03, 0x0C, 0xE0, 0x01, 0x0C, 0xE0, 0x00, 0x0C, 0x70, 0x00, 0x0C, 0x00, 0x00, 0x1C, 0x00, 0x00, 0xFC, 0x03, 0x00, 0xF8, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).buffer;
var ICON_DECODE = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x55, 0x01, 0x00, 0x55, 0x01, 0x00, 0x00, 0x00, 0x38, 0x00, 0x00, 0xfc, 0x00, 0x00, 0xf6, 0xff, 0x01, 0xe2, 0xff, 0x03, 0xf6, 0xff, 0x03, 0xfc, 0xff, 0x01, 0x78, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x55, 0x01, 0x00, 0x55, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).buffer;
var ICON_RANDOM = new Uint8Array([0x00, 0x00, 0x00, 0xCE, 0x01, 0x07, 0xCE, 0x11, 0x07, 0xCE, 0x01, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x38, 0x00, 0x84, 0x38, 0x02, 0x00, 0x38, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xC0, 0x01, 0x07, 0xC4, 0x11, 0x07, 0xC0, 0x01, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0E, 0x38, 0x00, 0x8E, 0x38, 0x02, 0x0E, 0x38, 0x00, 0x00, 0x00, 0x00]).buffer;
var ICON_BACK = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0x00, 0x00, 0xc0, 0x00, 0x00, 0x60, 0x00, 0x00, 0x30, 0x00, 0x00, 0xf8, 0x7f, 0x00, 0xf8, 0xff, 0x00, 0x30, 0x80, 0x01, 0x60, 0x00, 0x01, 0xc0, 0x00, 0x01, 0x80, 0x00, 0x01, 0x00, 0x00, 0x01, 0x00, 0x00, 0x01, 0x00, 0x00, 0x01, 0x00, 0x00, 0x01, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).buffer;

// Verified-key badge: 14x14 checkmark.
var ICON_CHECK_W = 14, ICON_CHECK_H = 14;
var ICON_CHECK = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x30, 0x00, 0x18, 0x00, 0x0c, 0x00, 0x06, 0x03, 0x03, 0x86, 0x01, 0xcc, 0x00, 0x78, 0x00, 0x30, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).buffer;

/**
 * Draw a 1-bit bitmap (XBM / LSB-first byte order) pixel by pixel.
 * @param {number} x - Left position on screen.
 * @param {number} y - Top position on screen.
 * @param {ArrayBuffer} bitmap - Packed 1-bpp data, row-major, LSB-first.
 * @param {number} width - Bitmap width in pixels.
 * @param {number} height - Bitmap height in pixels.
 * @param {number} color - Colour for set (1) pixels.
 * @param {number} [bgColor] - Optional colour for unset (0) pixels; if omitted, unset pixels are skipped (transparent).
 */
function renderBitmap(x, y, bitmap, width, height, color, bgColor) {
    var data = new Uint8Array(bitmap);
    var byteWidth = (width + 7) >> 3;
    var hasBg = bgColor !== undefined;

    for (var j = 0; j < height; j++) {
        var rowStart = j * byteWidth;
        var i = 0;
        while (i < width) {
            var pixel = (data[rowStart + (i >> 3)] >> (i & 7)) & 1;
            var runStart = i;
            i++;
            while (i < width && ((data[rowStart + (i >> 3)] >> (i & 7)) & 1) === pixel) {
                i++;
            }
            if (pixel) {
                if (i - runStart === 1) {
                    display.drawPixel(x + runStart, y + j, color);
                } else {
                    display.drawLine(x + runStart, y + j, x + i - 1, y + j, color);
                }
            } else if (hasBg) {
                if (i - runStart === 1) {
                    display.drawPixel(x + runStart, y + j, bgColor);
                } else {
                    display.drawLine(x + runStart, y + j, x + i - 1, y + j, bgColor);
                }
            }
        }
    }
}

display.fill(bgColor);
display.setTextColor(priColor);
display.setTextSize(1);
display.drawString("SasPes", 10, 10);
display.drawString(version, displayWidth - 10 - version.length * 6, 10);
display.setTextSize(3);
display.drawString("Key Decoding", (displayWidth - 18 * 12) / 2, displayHeight - 40);

renderBitmap((displayWidth - 100) / 2, 20, logo, 100, 100, priColor, bgColor);

delay(500);

/*
    KeyExample: {
        displayName: "Key Example",     // display name shown in menu
        isDiskDetainer: false,          // whether the key is a disk detainer type (default false)
        bladeHeight: 45,                // blade height for disk detainer keys (default 45)
        outlines: ["5 pins", "6 pins"], // number of pins
        pinSpacing: 31,                 // distance between pins (default 31)
        maxKeyCut: 9,                   // number of cuts (default 9)
        flatSpotWidth: 5,               // width of flat spot of the cut (default 5)
        cutDepthOffset: 5,              // depth offset of each cut (default 5)
        zeroCutOffset: 0,               // depth offset of zero cut (default 0)
        edgeOffsetX: 0,                 // x offset of the bottom-right diagonal (default 0)
        edgeOffsetY: 0,                 // y offset of the bottom line (default 0)
        pinsStartAtZero: false,         // whether pin numbers start at 0 or 1 (default false)
        pinNumbersOffset: 0             // x offset for pin numbers with underline (default 0)
    }
 */

var keys = {
    Titan: {
        outlines: ["5 pins"],
        pinSpacing: 30,
        maxKeyCut: 9,
        cutDepthOffset: 4,
        zeroCutOffset: 2,
        edgeOffsetX: 5,
        edgeOffsetY: 1
    },
    Kwikset: {
        outlines: ["5 pins"],
        pinSpacing: 30,
        maxKeyCut: 7,
        flatSpotWidth: 10,
        edgeOffsetX: 15
    },
    Master: {
        outlines: ["4 pins", "5 pins", "6 pins"],
        pinSpacing: 24,
        maxKeyCut: 8,
        flatSpotWidth: 8,
        cutDepthOffset: 3,
        edgeOffsetX: -5,
        edgeOffsetY: -10,
        pinsStartAtZero: true,
        pinNumbersOffset: -4
    },
    American: {
        outlines: ["5 pins", "6 pins"],
        pinSpacing: 24,
        maxKeyCut: 8,
        flatSpotWidth: 8,
        cutDepthOffset: 3,
        edgeOffsetX: -5,
        edgeOffsetY: -10,
        pinNumbersOffset: -4
    },
    Best: {
        outlines: ["6 pins/A2", "7 pins/A2"],
        pinSpacing: 29,
        maxKeyCut: 10,
        flatSpotWidth: 6,
        cutDepthOffset: 3,
        edgeOffsetX: -5,
        pinsStartAtZero: true
    },
    ASSA: {
        outlines: ["5 pins", "6 pins", "7 pins"],
        pinSpacing: 30,
        maxKeyCut: 9,
        flatSpotWidth: 2,
        cutDepthOffset: 4,
        zeroCutOffset: 1,
        edgeOffsetX: 7
    },
    Schlage: {
        outlines: ["5 pins/SC1", "6 pins/SC4"],
        pinSpacing: 30,
        maxKeyCut: 10,
        cutDepthOffset: 3,
        pinsStartAtZero: true,
        flatSpotWidth: 10,
        edgeOffsetY: 1
    },
    Yale: {
        // Yale Y1 (5 pins) / Y2 (6 pins). Same DSD: depths 0-9, .165" spacing.
        outlines: ["5 pins/Y1", "6 pins/Y2"],
        pinSpacing: 31,
        maxKeyCut: 10,
        cutDepthOffset: 3,
        edgeOffsetX: 17,
        edgeOffsetY: -5,
        pinsStartAtZero: true,
    },
    YaleSmall: {
        displayName: "Yale Small",
        outlines: ["4 pins", "5 pins"],
        pinSpacing: 24,
        maxKeyCut: 6,
        flatSpotWidth: 6,
        cutDepth: 5,
        edgeOffsetX: 6,
        edgeOffsetY: -9,
        pinNumbersOffset: -4,
        pinsStartAtZero: true
    },
    AbloyClassic: {
        displayName: "Abloy Classic",
        isDiskDetainer: true,
        outlines: ["7 disks", "9 disks", "11 disks"],
        pinSpacing: 16,
        maxKeyCut: 6
    },
    AbloyHighProfile: {
        displayName: "Abloy High Profile",
        isDiskDetainer: true,
        outlines: ["7 disks", "9 disks", "11 disks"],
        pinSpacing: 16,
        maxKeyCut: 6,
        bladeHeight: 57
    },
    CorbinRusswin: {
        displayName: "Corbin Russwin",
        outlines: ["5 pins/RU45", "6 pins/CX6A"],
        pinSpacing: 30,
        maxKeyCut: 6,
        cutDepthOffset: 5,
        pinsStartAtZero: false,
        flatSpotWidth: 10,
        edgeOffsetX: -3,
        edgeOffsetY: 1
    },
    MedecoBiaxial: {
        displayName: "Medeco Biaxial",
        outlines: ["6 pins"],
        pinSpacing: 33,
        maxKeyCut: 6,
        flatSpotWidth: 2,
        cutDepthOffset: 6,
        zeroCutOffset: 2,
        edgeOffsetX: 9,
        edgeOffsetY: -7
    },
    Weiser: {
        outlines: ["5 pins/WR5", "6 pins/WR3"],
        pinSpacing: 30,
        maxKeyCut: 10,
        cutDepthOffset: 3,
        flatSpotWidth: 10,
        edgeOffsetX: 15,
        pinsStartAtZero: true
    },
    Weslock: {
        outlines: ["5 pins"],
        pinSpacing: 30,
        maxKeyCut: 10,
        cutDepthOffset: 3,
        flatSpotWidth: 10,
        edgeOffsetX: 15,
        pinsStartAtZero: true
    },
    Sargent: {
        outlines: ["5 pins/LA", "6 pins/LA"],
        pinSpacing: 32,
        maxKeyCut: 10,
        cutDepthOffset: 3,
        flatSpotWidth: 8,
        edgeOffsetX: 5,
        pinNumbersOffset: -3
    },
    National: {
        outlines: ["5 pins/D8775"],
        pinSpacing: 30,
        maxKeyCut: 10,
        cutDepthOffset: 3,
        flatSpotWidth: 8,
        edgeOffsetX: 5,
        pinsStartAtZero: true
    },
    Lockwood: {
        outlines: ["5 pins/LW4", "6 pins/LW5"],
        pinSpacing: 30,
        maxKeyCut: 10,
        cutDepthOffset: 3,
        flatSpotWidth: 10,
        edgeOffsetX: 10,
        pinsStartAtZero: true
    },
    // --- Automotive / power-sport 2-sided keys (sourced from KeyCopier) ---
    // For some of these the displayed bitting is taken as symmetric and renders 
    // the same depth on the top and bottom faces at each position.
    Ford: {
        displayName: "Ford",
        outlines: ["8 cuts/H75"],
        isDoubleSided: true,
        pinSpacing: 22,
        maxKeyCut: 5,
        cutDepthOffset: 3,
        flatSpotWidth: 4
    },
    Chevrolet: {
        displayName: "Chevy",
        outlines: ["10 cuts/B102"],
        isDoubleSided: true,
        pinSpacing: 20,
        maxKeyCut: 4,
        cutDepthOffset: 3,
        flatSpotWidth: 4
    },
    Dodge: {
        displayName: "Dodge",
        outlines: ["8 cuts/Y159"],
        isDoubleSided: true,
        pinSpacing: 22,
        maxKeyCut: 4,
        cutDepthOffset: 3,
        flatSpotWidth: 4
    },
    Kawasaki: {
        displayName: "Kawasaki",
        outlines: ["6 cuts/KA14"],
        isDoubleSided: true,
        pinSpacing: 26,
        maxKeyCut: 4,
        cutDepthOffset: 3,
        flatSpotWidth: 4
    },
    Subaru: {
        displayName: "Subaru",
        outlines: ["9 cuts/DSD435"],
        isInternalCut: true,
        pinSpacing: 22,
        maxKeyCut: 3,
        cutDepthOffset: 4,
        flatSpotWidth: 3,
        // DSD 435 is asymmetric: 4 cuts on the top track, 5 on the bottom,
        // with the top cuts staggered by half a position so they sit between
        // the bottom cuts (units of pinSpacing).
        topCutCount: 4,
        topCutOffset: 0.5
    },

    Suzuki: {
        displayName: "Suzuki",
        outlines: ["7 cuts/SUZ18"],
        isDoubleSided: true,
        pinSpacing: 24,
        maxKeyCut: 4,
        cutDepthOffset: 3,
        flatSpotWidth: 4
    },
    Yamaha: {
        displayName: "Yamaha",
        outlines: ["7 cuts/YM63"],
        isDoubleSided: true,
        pinSpacing: 24,
        maxKeyCut: 4,
        cutDepthOffset: 3,
        flatSpotWidth: 4
    },
    RV: {
        displayName: "RV",
        outlines: ["5 cuts"],
        isDoubleSided: true,
        pinSpacing: 28,
        maxKeyCut: 3,
        cutDepthOffset: 4,
        flatSpotWidth: 5
    }
};

/*
    Interchangeable keys.

    Some lock brands share identical Depth-and-Spacing Data (DSD) with a brand
    already defined in `keys` above, with the same cut positions and depth
    increments. 

    An alias names a `base` (any key in `keys`) and inherits every cut parameter
    from it; you normally override only `displayName` and `outlines`. 
*/
var interchangeable = {
    Lincoln: {
        base: "Ford",
        displayName: "Lincoln"
    },
    Mercury: {
        base: "Ford",
        displayName: "Mercury"
    },

    Buick: {
        base: "Chevrolet",
        displayName: "Buick"
    },
    Pontiac: {
        base: "Chevrolet",
        displayName: "Pontiac"
    },
    Oldsmobile: {
        base: "Chevrolet",
        displayName: "Oldsmobile"
    },
    GMC: {
        base: "Chevrolet",
        displayName: "GMC"
    },

    Chrysler: {
        base: "Dodge",
        displayName: "Chrysler"
    },
    Plymouth: {
        base: "Dodge",
        displayName: "Plymouth"
    },
    Jeep: {
        base: "Dodge",
        displayName: "Jeep"
    },


    // --- Best A2 small-format interchangeable core group (base: Best) ---
    Falcon: {
        base: "Best",
        displayName: "Falcon",
        outlines: ["6 pins/A", "7 pins/A"]
    },
    Arrow: {
        base: "Best",
        displayName: "Arrow",
        outlines: ["6 pins/A", "7 pins/A"]
    },
    Eagle: {
        base: "Best",
        displayName: "Eagle",
        outlines: ["6 pins/A", "7 pins/A"]
    },
    KSP: {
        base: "Best",
        displayName: "KSP",
        outlines: ["6 pins/A", "7 pins/A"]
    },
    GMS: {
        base: "Best",
        displayName: "GMS",
        outlines: ["6 pins/A", "7 pins/A"]
    }
};

// Resolve each interchangeable key into a full entry by copying its base
// spec and applying overrides. After this runs, the rest of the script treats
// these brands exactly like any natively-defined key.
(function () {
    var names = Object.keys(interchangeable);
    for (var i = 0; i < names.length; i++) {
        var name = names[i];
        var def = interchangeable[name];
        var base = keys[def.base];
        if (base) {
            var merged = {};

            var baseProps = Object.keys(base);
            for (var b = 0; b < baseProps.length; b++) {
                merged[baseProps[b]] = base[baseProps[b]];
            }

            var defProps = Object.keys(def);
            for (var d = 0; d < defProps.length; d++) {
                if (defProps[d] !== "base") {
                    merged[defProps[d]] = def[defProps[d]];
                }
            }

            keys[name] = merged;
        }
    }
})();

/**
 * A selected key being decoded or randomized. Holds the per-cut depth array
 * and the draw/save/load behaviour. Geometry comes from keys[type].
 * @constructor
 * @param {string} type - Brand key into the `keys` table (e.g. "Schlage"), or "Load"/"Exit".
 * @param {string} outline - Chosen outline string (e.g. "5 pins/SC1"); leading digits give the cut count.
 * @param {string} show - "decode" (user edits cuts) or "random" (generated practice key).
 */
function Key(type, outline, show) {
    this.type = type;
    this.outline = outline;
    this.show = show;
    this.pins = [];

    // Initialize pins
    if (typeof outline === "string" && typeof show === "string") {
        var pinCount = parseInt(outline.substring(0, 2), 10);
        if (!isNaN(pinCount)) {
            if (show === "decode") {
                for (var i = 0; i < pinCount; i++) {
                    this.pins.push(0);
                }
            } else {
                for (var i = 0; i < pinCount; i++) {
                    var maxKeyCut = (keys[this.type] && keys[this.type].maxKeyCut) || 9;
                    this.pins.push(Math.floor(Math.random() * maxKeyCut));
                }
                // Ensure last disk shows as 1 for disk detainer (internal index 0)
                if (keys[this.type] && keys[this.type].isDiskDetainer && pinCount > 0) {
                    this.pins[pinCount - 1] = 0;
                }
            }
        }
    }

    /** Regenerate a fresh random bitting for a "random" key. */
    this.updatePins = function () {
        var pinCount = parseInt(this.outline.substring(0, 2), 10);
        this.pins = [];
        for (var i = 0; i < pinCount; i++) {
            var maxKeyCut = (keys[this.type] && keys[this.type].maxKeyCut) || 9;
            this.pins.push(Math.floor(Math.random() * maxKeyCut));
        }
        // Ensure last disk shows as 1 for disk detainer (internal index 0)
        if (keys[this.type] && keys[this.type].isDiskDetainer && pinCount > 0) {
            this.pins[pinCount - 1] = 0;
        }
    };

    /** Redraw the full decode screen: title, Save/Load actions, numbers and blade. */
    this.draw = function () {
        var numberOfActions = 2; // Save, Load
        if (selectedPinIndex >= this.pins.length + numberOfActions) {
            selectedPinIndex = 0;
        }

        display.fill(bgColor);
        display.drawRoundRect(1, 1, displayWidth - 2, displayHeight - 2, 4, priColor);
        display.setTextSize(2);

        var displayName = keys[this.type] && keys[this.type].displayName || this.type;
        var titleLine = displayName + " - " + this.outline;
        if (titleLine.length > 12) {
            display.drawString(displayName, 10, 10);
            display.drawString(this.outline, 10, 28);
        } else {
            display.drawString(titleLine, 10, 10);
        }

        if (this.show === "decode") {
            display.drawRoundRect(displayWidth - 65, 3, 60, 8 + numberOfActions * 24, 4, priColor);
            display.drawString("Save", displayWidth - 58, 12);
            display.drawString("Load", displayWidth - 58, 36);

            var selectedAction = selectedPinIndex - this.pins.length;
            if (selectedPinIndex >= this.pins.length) {
                display.drawRect(displayWidth - 60, 28 + selectedAction * 24, 50, 2, secColor);

                display.setTextSize(1);
                if (selectedAction === 0) {
                    display.drawString("Next: Save key", displayWidth - 90, displayHeight - 11);
                } else if (selectedAction === 1) {
                    display.drawString("Next: Load key", displayWidth - 90, displayHeight - 11);
                }
                display.setTextSize(2);
            }
        }

        var pinSpacing = keys[this.type] ? keys[this.type].pinSpacing : 31;
        drawPinsWithUnderline(this.pins, selectedPinIndex, this.show, pinSpacing, this.type);
    };

    /** Serialise this key to /keys/key_<type>_<bitting>_<ts>.json via storage.write. */
    this.save = function () {
        var data = {
            type: this.type,
            outline: this.outline,
            pins: this.pins
        };
        var fileName = "/keys/key_" + this.type + "_" + this.pins.join('') + "_" + Date.now() + ".json";
        const success = storage.write(fileName, JSON.stringify(data));
        if (success) {
            dialog.success("     Key saved successfully!     " + fileName, true);
        }
        display.setTextColor(priColor);
        selectedPinIndex = 0;
    };

    /**
     * Load a key from a saved JSON string and switch to decode mode.
     * @param {string} keyData - JSON produced by save().
     */
    this.load = function (keyData) {
        if (keyData) {
            var data = JSON.parse(keyData);
            this.type = data.type;
            this.outline = data.outline;
            this.show = "decode";
            this.pins = data.pins;
        }
        display.fill(bgColor);
    };
}

/**
 * Compute the blade's bottom edge as a per-column depth array by sweeping
 * every cut and taking the deepest contribution at each x. A real cutter
 * wheel moves through the metal at a fixed angle, so adjacent deep cuts share
 * one continuous valley between them instead of springing back up to the
 * blade top -- which is what removes the spiky look produced by per-cut Vs
 * for bittings like "99461".
 * @param {number} startX - Blade left edge (pixels).
 * @param {number} totalLength - Number of columns to compute.
 * @param {number} pinSpacing - Horizontal pixels between cut centres.
 * @param {number} pinCount - Number of cut positions.
 * @param {number[]} pins - Depth index per cut position.
 * @param {number} flatSpotWidth - Pixels of flat at the bottom of each cut.
 * @param {number} cutDepthOffset - Pixels of depth per depth step (cut > 0).
 * @param {number} zeroCutOffset - Depth (px) applied to cut index 0.
 * @returns {number[]} profile[c] = pixels below blade top at column startX + c.
 */
function generateBladeProfile(startX, totalLength, pinSpacing, pinCount, pins, flatSpotWidth, cutDepthOffset, zeroCutOffset) {
    var flatHalfWidth = Math.floor(flatSpotWidth / 2);
    // ~45-degree cutter (90-degree included angle): 1 px of depth per 1 px of
    // horizontal travel. A constant slope makes two equal-depth neighbours
    // share one flat-bottomed valley instead of forming two adjacent Vs.
    var slope = 1;

    var profile = [];
    for (var col = 0; col < totalLength; col++) {
        var maxDepth = 0;
        var px = startX + col;
        for (var i = 0; i < pinCount; i++) {
            var pinValue = pins[i] || 0;
            var depthAtCenter = (pinValue === 0) ? zeroCutOffset : pinValue * cutDepthOffset;
            if (depthAtCenter <= 0) continue;

            var pinCenter = startX + (i + 1) * pinSpacing;
            var distance = Math.abs(px - pinCenter);
            var here;
            if (distance <= flatHalfWidth) {
                here = depthAtCenter;
            } else {
                here = depthAtCenter - (distance - flatHalfWidth) * slope;
            }
            if (here > maxDepth) {
                maxDepth = here;
            }
        }
        profile[col] = maxDepth;
    }

    return profile;
}

/**
 * Draw the blade silhouette of a pin-tumbler key (the cut bottom edge plus the
 * tip diagonal and bottom edge) for the given bitting.
 * @param {number} x - Left of the blade.
 * @param {number} y - Top (uncut) edge of the blade.
 * @param {number} width - Blade width in px (pinSpacing * pin count).
 * @param {number} height - Blade height in px.
 * @param {number} color - Line colour.
 * @param {number} pinCount - Number of cut positions.
 * @param {number[]} pins - Depth index per position.
 * @param {string} keyType - Brand key into `keys` for geometry.
 */
function drawKeyShape(x, y, width, height, color, pinCount, pins, keyType) {
    var keyConfig = keys[keyType] || {};

    var pinSpacing = keyConfig.pinSpacing || 31;
    var flatSpotWidth = keyConfig.flatSpotWidth || 5;
    var cutDepthOffset = keyConfig.cutDepthOffset || 5;
    var zeroCutOffset = keyConfig.zeroCutOffset || 0;

    var edgeOffsetX = keyConfig.edgeOffsetX || 0;
    var edgeOffsetY = keyConfig.edgeOffsetY || 0;
    var isDoubleSided = !!keyConfig.isDoubleSided;

    var startPx = Math.round(x);
    var endPx = Math.round(x + width + pinSpacing / 2);
    var totalLength = endPx - startPx + 1;
    var profile = generateBladeProfile(startPx, totalLength, pinSpacing, pinCount, pins,
        flatSpotWidth, cutDepthOffset, zeroCutOffset);

    var edgeX = x + width + pinSpacing / 2 + edgeOffsetX;
    var edgeY = y + height + edgeOffsetY;

    // Sidewinder / internal-cut keys are drawn entirely by
    // drawInternalCutPinsWithUnderline; they never reach this path.

    // Top cut profile: cuts come down from the blade's uncut top edge.
    var prevPy = y + profile[0];
    for (var col = 0; col < totalLength; col++) {
        var py = y + profile[col];
        // Bridge vertical gaps between adjacent columns so steep slopes (and
        // the inside walls at the start/end of a deep cut) stay connected
        // instead of breaking into disconnected pixels.
        if (col > 0 && Math.abs(py - prevPy) > 1) {
            display.drawLine(startPx + col - 1, prevPy, startPx + col, py, color);
        } else {
            display.drawPixel(startPx + col, py, color);
        }
        prevPy = py;
    }

    if (isDoubleSided) {
        // Mirror the cut profile on the bottom edge (automotive keys cut on
        // both faces). Close the tip with a vertical between the two profile
        // ends so the silhouette doesn't run off to a pointed diagonal.
        var prevPyB = edgeY - profile[0];
        for (var colB = 0; colB < totalLength; colB++) {
            var pyB = edgeY - profile[colB];
            if (colB > 0 && Math.abs(pyB - prevPyB) > 1) {
                display.drawLine(startPx + colB - 1, prevPyB, startPx + colB, pyB, color);
            } else {
                display.drawPixel(startPx + colB, pyB, color);
            }
            prevPyB = pyB;
        }
        var tipX = startPx + totalLength - 1;
        display.drawLine(tipX, y + profile[totalLength - 1], tipX, edgeY - profile[totalLength - 1], color);
    } else {
        // Single-sided: diagonal tip going up-right plus a flat bottom edge.
        var diagLength = 30;
        var diagBottomX = edgeX + diagLength;
        var diagBottomY = edgeY - diagLength;
        display.drawLine(edgeX, edgeY, diagBottomX, diagBottomY, color);
        display.drawLine(x, edgeY, edgeX, edgeY, color);
    }
}

/**
 * Draw the row of depth numbers above the key and the blade beneath, with an
 * underline under the currently selected cut. Delegates to the disk-detainer
 * renderer when the key is a disc type.
 * @param {number[]} pins - Depth index per cut position.
 * @param {number} selectedPinIndex - Index of the highlighted cut (or an action index).
 * @param {string} showMode - "decode" or "random".
 * @param {number} pinSpacing - Horizontal pixels per cut position.
 * @param {string} keyType - Brand key into `keys`.
 */
function drawPinsWithUnderline(pins, selectedPinIndex, showMode, pinSpacing, keyType) {
    if (keys[keyType] && keys[keyType].isDiskDetainer) {
        drawDisksWithUnderline(pins, selectedPinIndex, showMode, pinSpacing, keyType);
        return;
    }
    if (keys[keyType] && keys[keyType].isInternalCut) {
        drawInternalCutPinsWithUnderline(pins, selectedPinIndex, showMode, pinSpacing, keyType);
        return;
    }

    var startY = 55;
    var underlineY = startY + 15;
    var totalWidth = pinSpacing * pins.length;
    var startX = (displayWidth - totalWidth) / 2;

    var numberSize = 12;
    var keyConfig = keys[keyType] || {};
    var pinsStartCount = keyConfig.pinsStartAtZero === true;
    var pinNumbersOffset = keyConfig.pinNumbersOffset || 0;

    // Draw pins numbers
    for (var i = 0; i < pins.length; i++) {
        var pinNumberX = startX + numberSize + i * pinSpacing + pinNumbersOffset;
        var displayNumber = pinsStartCount ? pins[i] : (pins[i] + 1);
        display.drawString(displayNumber.toString(), pinNumberX, startY);

        if (showMode !== "random" && typeof selectedPinIndex !== "undefined" && i === selectedPinIndex) {
            display.drawRect(pinNumberX - 1, underlineY, 12, 2, secColor);
        }
    }

    // Draw the key shape under the pins
    var keyX = startX - pinSpacing / 2;
    var keyY = startY + pinSpacing;
    drawKeyShape(keyX, keyY, totalWidth, 66, priColor, pins.length, pins, keyType);
}

/**
 * Draw the stepped blade of a disk-detainer key (e.g. Abloy), where each disc
 * rotation maps to a discrete cut depth.
 * @param {number} x - Left of the blade.
 * @param {number} y - Vertical centre reference for the blade.
 * @param {number} width - Blade width in px.
 * @param {number} height - Vertical space available.
 * @param {number} color - Line colour.
 * @param {number} diskCount - Number of discs.
 * @param {number[]} disks - Rotation index per disc.
 * @param {string} keyType - Brand key into `keys`.
 */
function drawDiskKeyShape(x, y, width, height, color, diskCount, disks, keyType) {
    var keyConfig = keys[keyType] || {};
    var pinSpacing = keyConfig.pinSpacing || 32;
    var bladeHeight = keyConfig.bladeHeight || 45;
    var bladeY = y + (height - bladeHeight) / 2;
    var bladeBottom = bladeY + bladeHeight;

    var diskCutDepths = [0, 2, 4, 8, 14, 21];

    var entryX = x;
    var entryY = bladeY;
    var keyStartOffset = 20;
    var keyStartX = entryX + keyStartOffset;

    var currX = keyStartX;
    var prevCutDepth = diskCutDepths[disks[0]] || 0;

    // Connect left side: vertical from bottom to first cut
    display.drawLine(currX, bladeBottom, currX, bladeBottom - prevCutDepth, color);

    // Draw the first horizontal segment
    display.drawLine(currX, bladeBottom - prevCutDepth, currX + pinSpacing, bladeBottom - prevCutDepth, color);

    for (var i = 1; i < diskCount; i++) {
        var cutIdx = disks[i] || 0;
        var cutDepth = diskCutDepths[cutIdx] || 0;
        var nextX = currX + pinSpacing;

        // Draw vertical line connecting previous cut to current cut
        display.drawLine(nextX, bladeBottom - prevCutDepth, nextX, bladeBottom - cutDepth, color);

        // Draw horizontal line for current cut
        display.drawLine(nextX, bladeBottom - cutDepth, nextX + pinSpacing, bladeBottom - cutDepth, color);

        currX = nextX;
        prevCutDepth = cutDepth;
    }

    // Draw end vertical (right side)
    display.drawLine(currX + pinSpacing + 2, bladeBottom - prevCutDepth, currX + pinSpacing + 2, bladeY, color);

    // Draw bottom edge (from entry to start of key)
    display.drawLine(entryX, bladeBottom, entryX + keyStartOffset, bladeBottom, color);

    // Draw top edge (from entry to start of key)
    display.drawLine(entryX, entryY, currX + pinSpacing, bladeY, color);

    // Diagonal from top-left to key start (top edge)
    display.drawLine(30, bladeY - 10, entryX, bladeY, color);

    // Diagonal from bottom-left to key start (bottom edge)
    display.drawLine(30, bladeBottom + 10, entryX, bladeBottom, color);
}

/**
 * Disk-detainer counterpart of drawPinsWithUnderline: draws the disc numbers
 * and the disk-detainer blade with the selected disc underlined.
 * @param {number[]} disks - Rotation index per disc.
 * @param {number} selectedDiskIndex - Highlighted disc index.
 * @param {string} showMode - "decode" or "random".
 * @param {number} pinSpacing - Horizontal pixels per disc.
 * @param {string} keyType - Brand key into `keys`.
 */
function drawDisksWithUnderline(disks, selectedDiskIndex, showMode, pinSpacing, keyType) {
    var startY = 55;
    var underlineY = startY + 15;
    var totalWidth = pinSpacing * disks.length;
    var startX = (displayWidth - totalWidth) / 2;
    var numberSize = 12;

    for (var i = 0; i < disks.length; i++) {
        var diskNumberX = startX + numberSize + i * pinSpacing;
        display.drawString((disks[i] + 1).toString(), diskNumberX, startY);
        if (showMode !== "random" && typeof selectedDiskIndex !== "undefined" && i === selectedDiskIndex) {
            display.drawRect(diskNumberX - 1, underlineY, 12, 2, secColor);
        }
    }

    // Draw the disk detainer key shape under the disks
    var keyX = startX - pinSpacing / 2;
    var keyY = startY + pinSpacing;
    drawDiskKeyShape(keyX, keyY, totalWidth, 66, priColor, disks.length, disks, keyType);
}

/**
 * Sidewinder / internal-cut counterpart of drawPinsWithUnderline. Splits the
 * pins array in half: pins[0..half-1] are the top milled track, pins[half..]
 * are the bottom milled track. Top-track depths display above the blade,
 * bottom-track below, underline on whichever row holds the selected cut.
 *
 * Layout: the blade hugs the left screen edge and the area between the left
 * edge and the first cut is drawn as a max-depth "leading groove" -- both
 * tracks meet near the centre line, the same look a real TOY51 blade has
 * before the cut features start. This gives the user a visual reference for
 * aligning the cuts against the shoulder.
 *
 * @param {number[]} pins - Length = 2 * positions. pins[0..half-1] = top
 *   track, pins[half..2*half-1] = bottom track.
 * @param {number} selectedPinIndex - Highlighted cut (0..pins.length-1) or an
 *   action index past the cuts.
 * @param {string} showMode - "decode" or "random".
 * @param {number} pinSpacing - Horizontal pixels per cut position.
 * @param {string} keyType - Brand key into `keys`.
 */
function drawInternalCutPinsWithUnderline(pins, selectedPinIndex, showMode, pinSpacing, keyType) {
    var keyConfig = keys[keyType] || {};
    var cutDepthOffset = keyConfig.cutDepthOffset || 3;
    var maxKeyCut = keyConfig.maxKeyCut || 4;
    var flatSpotWidth = keyConfig.flatSpotWidth || 4;
    var pinsStartCount = keyConfig.pinsStartAtZero === true;

    // Top track may have fewer cuts than the bottom (e.g. Subaru DSD 435 is 4+5).
    // Default to an even split when topCutCount isn't specified.
    var topCount = (typeof keyConfig.topCutCount === "number")
        ? keyConfig.topCutCount
        : Math.floor(pins.length / 2);
    var botCount = pins.length - topCount;

    // Optional half-position stagger between the two tracks (units of pinSpacing).
    // Subaru DSD 435 uses 0.5 so the 4 top cuts sit between the 5 bottom cuts.
    var topCutOffsetUnits = (typeof keyConfig.topCutOffset === "number")
        ? keyConfig.topCutOffset
        : 0;
    var topCutOffsetPx = Math.round(topCutOffsetUnits * pinSpacing);

    // Blade dimensions at ~7.5 px/mm (see CLAUDE.md "Pixel scale"):
    //   leadingGroove 90 px ~= 12 mm shoulder-to-first-cut runout
    //   bladeHeight 56 px   ~= 7.5 mm blade height
    //   trailingMargin      = room past the last cut for the 45-degree run
    //                         from the last cut's depth out to the outer edge.
    var bladeX = 6;
    var leadingGroove = 90;
    var bladeHeight = 56;
    var maxDepth = (maxKeyCut - 1) * cutDepthOffset;
    var trailingMargin = Math.floor(bladeHeight / 4) + maxDepth + 6;
    var botFirstCutX = bladeX + leadingGroove;
    var topFirstCutX = botFirstCutX + topCutOffsetPx;
    var topLastCutX = topFirstCutX + pinSpacing * (topCount - 1);
    var botLastCutX = botFirstCutX + pinSpacing * (botCount - 1);
    var lastCutX = topLastCutX > botLastCutX ? topLastCutX : botLastCutX;
    var bladeRight = lastCutX + trailingMargin;
    var bladeWidth = bladeRight - bladeX;

    var topNumY = 50;
    var topUnderlineY = topNumY + 15;
    var bladeY = topNumY + 22;
    var bladeBot = bladeY + bladeHeight;
    var botNumY = bladeBot + 6;
    var botUnderlineY = botNumY + 15;

    var flatHalfWidth = Math.floor(flatSpotWidth / 2);
    // Slope rate for the rise/fall between the milled channel and each cut.
    // 1 = 45 deg; lower = gentler/longer slope. The trailing diagonal past
    // the last cut still uses 1 (45 deg) per the spec sheet geometry.
    var channelSlope = 0.5;

    // Top-track numbers row, each centred over its cut column.
    for (var i = 0; i < topCount; i++) {
        var cutX = topFirstCutX + i * pinSpacing;
        var topNumX = cutX - 6;
        var topDisplay = pinsStartCount ? pins[i] : (pins[i] + 1);
        display.drawString(topDisplay.toString(), topNumX, topNumY);
        if (showMode !== "random" && typeof selectedPinIndex !== "undefined" && i === selectedPinIndex) {
            display.drawRect(topNumX - 1, topUnderlineY, 12, 2, secColor);
        }
    }

    // Closed rectangular blade silhouette.
    display.drawLine(bladeX, bladeY, bladeRight, bladeY, priColor);
    display.drawLine(bladeX, bladeBot, bladeRight, bladeBot, priColor);
    display.drawLine(bladeX, bladeY, bladeX, bladeBot, priColor);
    display.drawLine(bladeRight, bladeY, bladeRight, bladeBot, priColor);

    var topBaseY = bladeY + Math.floor(bladeHeight / 4);
    var botBaseY = bladeY + Math.floor(3 * bladeHeight / 4);
    // Depth at which each track meets its outer blade edge (negative = away
    // from the centreline, toward the outer surface).
    var topOuterDepth = -(topBaseY - bladeY);
    var botOuterDepth = -(bladeBot - botBaseY);

    // Render two milled tracks column-by-column. In the leading groove each
    // track sits at max depth (closest to centre); between its own first and
    // last cut, depth comes from the per-cut profile. The tracks are
    // evaluated independently because they may have different cut counts
    // and may be staggered relative to one another.
    var prevTopY = topBaseY + maxDepth;
    var prevBotY = botBaseY - maxDepth;

    for (var col = 0; col < bladeWidth; col++) {
        var colX = bladeX + col;
        var topDepth, botDepth;

        if (colX > topLastCutX) {
            // After the last cut, slope outward at 45 degrees from the last
            // cut's depth until the track reaches the outer blade edge, then
            // run flat along the edge.
            var topLastDepth = maxDepth - (pins[topCount - 1] || 0) * cutDepthOffset;
            topDepth = topLastDepth - (colX - topLastCutX);
            if (topDepth < topOuterDepth) topDepth = topOuterDepth;
        } else {
            // Default everywhere is the milled channel at maxDepth. Each cut
            // pulls the track outward (smaller depth) by pinValue * cutDepthOffset,
            // with a gentle channelSlope ramp on each side of its flat.
            topDepth = maxDepth;
            for (var ti = 0; ti < topCount; ti++) {
                var topCutCenter = topFirstCutX + ti * pinSpacing;
                var topPinDepth = maxDepth - (pins[ti] || 0) * cutDepthOffset;
                // Extend the flat shoulder when adjacent cuts share the same
                // depth, so equal neighbours read as one continuous flat.
                var topFlatLeft = topCutCenter - flatHalfWidth;
                var topFlatRight = topCutCenter + flatHalfWidth;
                if (ti > 0 && pins[ti - 1] === pins[ti]) {
                    topFlatLeft = topCutCenter - Math.floor(pinSpacing / 2);
                }
                if (ti < topCount - 1 && pins[ti + 1] === pins[ti]) {
                    topFlatRight = topCutCenter + Math.floor(pinSpacing / 2);
                }
                var topHere;
                if (colX >= topFlatLeft && colX <= topFlatRight) {
                    topHere = topPinDepth;
                } else {
                    var topDist = (colX < topFlatLeft) ? (topFlatLeft - colX) : (colX - topFlatRight);
                    topHere = topPinDepth + topDist * channelSlope;
                    if (topHere > maxDepth) topHere = maxDepth;
                }
                if (topHere < topDepth) topDepth = topHere;
            }
        }

        if (colX > botLastCutX) {
            var botLastDepth = maxDepth - (pins[topCount + botCount - 1] || 0) * cutDepthOffset;
            botDepth = botLastDepth - (colX - botLastCutX);
            if (botDepth < botOuterDepth) botDepth = botOuterDepth;
        } else {
            botDepth = maxDepth;
            for (var bi = 0; bi < botCount; bi++) {
                var botCutCenter = botFirstCutX + bi * pinSpacing;
                var botPinDepth = maxDepth - (pins[topCount + bi] || 0) * cutDepthOffset;
                var botFlatLeft = botCutCenter - flatHalfWidth;
                var botFlatRight = botCutCenter + flatHalfWidth;
                if (bi > 0 && pins[topCount + bi - 1] === pins[topCount + bi]) {
                    botFlatLeft = botCutCenter - Math.floor(pinSpacing / 2);
                }
                if (bi < botCount - 1 && pins[topCount + bi + 1] === pins[topCount + bi]) {
                    botFlatRight = botCutCenter + Math.floor(pinSpacing / 2);
                }
                var botHere;
                if (colX >= botFlatLeft && colX <= botFlatRight) {
                    botHere = botPinDepth;
                } else {
                    var botDist = (colX < botFlatLeft) ? (botFlatLeft - colX) : (colX - botFlatRight);
                    botHere = botPinDepth + botDist * channelSlope;
                    if (botHere > maxDepth) botHere = maxDepth;
                }
                if (botHere < botDepth) botDepth = botHere;
            }
        }

        var topY = topBaseY + topDepth;
        var botY = botBaseY - botDepth;

        if (col > 0 && Math.abs(topY - prevTopY) > 1) {
            display.drawLine(colX - 1, prevTopY, colX, topY, priColor);
        } else {
            display.drawPixel(colX, topY, priColor);
        }
        if (col > 0 && Math.abs(botY - prevBotY) > 1) {
            display.drawLine(colX - 1, prevBotY, colX, botY, priColor);
        } else {
            display.drawPixel(colX, botY, priColor);
        }
        prevTopY = topY;
        prevBotY = botY;
    }

    // Bottom-track numbers row.
    for (var j = 0; j < botCount; j++) {
        var cutX2 = botFirstCutX + j * pinSpacing;
        var botNumX = cutX2 - 6;
        var botDisplay = pinsStartCount ? pins[topCount + j] : (pins[topCount + j] + 1);
        display.drawString(botDisplay.toString(), botNumX, botNumY);
        if (showMode !== "random" && typeof selectedPinIndex !== "undefined" && (topCount + j) === selectedPinIndex) {
            display.drawRect(botNumX - 1, botUnderlineY, 12, 2, secColor);
        }
    }
}

var key = null;
var selectedPinIndex = 0;
var lastBrandMenuSelection = 0;

/**
 * Pick a generic category glyph for a brand: padlock, SFIC core, disc, angled
 * (Medeco) or the default key. These are category cues, not brand logos.
 * @param {string} name - Brand key into `keys`.
 * @returns {ArrayBuffer} One of the ICON_* bitmaps.
 */
function iconForKey(name) {
    var padlocks = {Master: 1, American: 1};
    var cores = {Best: 1, Falcon: 1, Arrow: 1, Eagle: 1, KSP: 1, GMS: 1};
    var discs = {AbloyClassic: 1, AbloyHighProfile: 1};
    var angled = {MedecoBiaxial: 1};
    var vehicles = {
        Ford: 1, Lincoln: 1, Mercury: 1,
        Chevrolet: 1, Buick: 1, Pontiac: 1, Oldsmobile: 1, GMC: 1,
        Dodge: 1, Chrysler: 1, Plymouth: 1, Jeep: 1,
        Kawasaki: 1, Subaru: 1, Suzuki: 1, Yamaha: 1, RV: 1
    };
    if (padlocks[name]) return ICON_PADLOCK;
    if (cores[name]) return ICON_CORE;
    if (discs[name]) return ICON_DISC;
    if (angled[name]) return ICON_ANGLE;
    if (vehicles[name]) return ICON_VEHICLES_KEY;
    return ICON_KEY;
}

// Tested pin/disk options per brand, mirroring the README's supported-keys
// table. Drives the checkmark badge on the outline picker menu.
var verifiedOutlines = {
    ASSA: {"5 pins": 1, "6 pins": 1, "7 pins": 1},
    AbloyClassic: {"7 disks": 1, "9 disks": 1, "11 disks": 1},
    AbloyHighProfile: {"7 disks": 1, "9 disks": 1, "11 disks": 1},
    American: {"5 pins": 1, "6 pins": 1},
    Best: {"7 pins/A2": 1},
    CorbinRusswin: {"5 pins/RU45": 1, "6 pins/CX6A": 1},
    Kwikset: {"5 pins": 1},
    Master: {"4 pins": 1, "5 pins": 1},
    MedecoBiaxial: {"6 pins": 1},
    Schlage: {"5 pins/SC1": 1, "6 pins/SC4": 1},
    Titan: {"5 pins/KW10": 1},
    Yale: {"5 pins/Y1": 1},
    YaleSmall: {"4 pins": 1, "5 pins": 1}
};

/**
 * Whether a specific brand+outline combination has been tested per the README.
 * @param {string} name - Brand key into `keys`.
 * @param {string} outline - Outline label like "5 pins" or "6 pins/SC4".
 * @returns {boolean}
 */
function isVerifiedOutline(name, outline) {
    var b = verifiedOutlines[name];
    return !!(b && b[outline]);
}

// Scrolling menu with an icon per row. entries: [{ label, value, icon }].
// Returns the chosen value, or null if the user backs out.
var MENU_LIST_TOP = 36;
var MENU_ROW_H = 24;

/**
 * Render one frame of the icon menu: title, divider, the visible window of
 * rows (icon + label) with the selected row boxed.
 * @param {string} title - Header text.
 * @param {{label:string,value:*,icon:ArrayBuffer}[]} entries - All rows.
 * @param {number} sel - Index of the selected row.
 * @param {number} top - Index of the first visible row (scroll offset).
 * @param {number} visible - Number of rows that fit on screen.
 * @param {string} [leftHeaderText] - Optional small text shown left of title.
 */
function drawMenu(title, entries, sel, top, visible, leftHeaderText) {
    display.fill(bgColor);
    display.drawRoundRect(1, 1, displayWidth - 2, displayHeight - 2, 4, priColor);
    display.setTextColor(priColor);

    if (leftHeaderText) {
        display.setTextSize(1);
        display.drawString(leftHeaderText, displayWidth - 40, 12);
    }
    display.setTextSize(2);
    display.drawString(title, 12, 8);
    display.drawLine(8, 30, displayWidth - 8, 30, priColor);

    for (var r = 0; r < visible; r++) {
        var idx = top + r;
        if (idx >= entries.length) {
            break;
        }
        var y = MENU_LIST_TOP + r * MENU_ROW_H;
        var e = entries[idx];

        if (idx === sel) {
            display.drawRoundRect(8, y - 2, displayWidth - 16, MENU_ROW_H + 1, 3, secColor);
        }
        if (e.icon) {
            renderBitmap(14, y + 1, e.icon, ICON_W, ICON_H, priColor);
        }
        display.setTextSize(2);
        display.drawString(e.label, 14 + ICON_W + 8, y + 3);
        if (e.verified) {
            renderBitmap(displayWidth - 12 - ICON_CHECK_W, y + (MENU_ROW_H - ICON_CHECK_H) / 2,
                ICON_CHECK, ICON_CHECK_W, ICON_CHECK_H, secColor);
        }
    }
}

/**
 * Run a scrolling, icon-per-row menu and block until the user chooses or backs
 * out. Next/Previous move (with wrap-around), Select confirms, Back exits.
 * @param {string} title - Header text.
 * @param {{label:string,value:*,icon:ArrayBuffer}[]} entries - Selectable rows.
 * @param {function(number, Array): string} [keyCountTextFn] - Optional key-count
 * text generator called as (sel, entries), e.g. "3/40".
 * @param {number} [initialSelection=0] - Initial highlighted row index.
 * @returns {*} The chosen entry's `value`, or null if the user backed out (Esc).
 */
function selectFromMenu(title, entries, keyCountTextFn, initialSelection) {
    var sel = (typeof initialSelection === "number") ? initialSelection : 0;
    if (sel < 0 || sel >= entries.length) {
        sel = 0;
    }
    var top = 0;
    var visible = Math.floor((displayHeight - MENU_LIST_TOP) / MENU_ROW_H);
    if (visible < 1) {
        visible = 1;
    }
    var dirty = true;

    while (true) {
        if (sel < top) {
            top = sel;
        }
        if (sel >= top + visible) {
            top = sel - visible + 1;
        }
        if (dirty) {
            var keyCountText = keyCountTextFn ? keyCountTextFn(sel, entries) : "";
            drawMenu(title, entries, sel, top, visible, keyCountText);
            dirty = false;
        }

        if (keyboard.getNextPress()) {
            sel = (sel + 1) % entries.length;
            dirty = true;
        } else if (keyboard.getPrevPress()) {
            sel = (sel - 1 + entries.length) % entries.length;
            dirty = true;
        } else if (keyboard.getSelPress()) {
            return entries[sel].value;
        } else if (keyboard.getEscPress()) {
            return null;
        }
        delay(10);
    }
}


function showInstructions() {
    var pages = [
        ["This tool simulates how", "a key will look", "with a specific bitting."],
        ["Pick a key brand and key", "from the list."],
        ["Choose Decode to enter", "a known bitting."],
        ["Choose Random to make", "a practice bitting."],
        ["Press Select to move to", "the next code position."],
        ["Scroll up to cut the", "position deeper."],
        ["Scroll down to cut", "it shallower."]
    ];
    var i = 0;
    var dirty = true;

    while (true) {
        if (dirty) {
            display.fill(bgColor);
            display.drawRoundRect(1, 1, displayWidth - 2, displayHeight - 2, 4, priColor);
            display.setTextColor(priColor);

            display.setTextSize(2);
            display.drawString("Instructions", 12, 8);
            display.drawLine(8, 30, displayWidth - 8, 30, priColor);

            display.setTextSize(1);
            display.drawString((i + 1) + "/" + pages.length, displayWidth - 40, 12);

            display.setTextSize(2);
            var page = pages[i];
            for (var L = 0; L < page.length; L++) {
                display.drawString(page[L], 14, 64 + L * 24);
            }

            display.setTextSize(1);
            display.drawString("Press Next to continue.", 12, displayHeight - 12);
            dirty = false;
        }

        if (keyboard.getNextPress()) {
            if (i < pages.length - 1) {
                i++;
            }
            dirty = true;
        } else if (keyboard.getPrevPress()) {
            if (i > 0) {
                i--;
            }
            dirty = true;
        } else if (keyboard.getSelPress() || keyboard.getEscPress()) {
            return;
        }
        delay(10);
    }
}

/**
 * Top-level flow: show the brand menu, then (for a real brand) the pin-count
 * and Decode/Random pickers, then build the global `key` and draw it. Handles
 * the Instructions, Load and Exit entries. Recurses to re-show the menu when
 * the user backs out of a sub-step.
 */
function chooseAndCreateKey() {
    selectedPinIndex = 0;

    var entries = [];
    var brandNames = Object.keys(keys).sort();
    for (var i = 0; i < brandNames.length; i++) {
        var brand = brandNames[i];
        var label = keys[brand].displayName || brand;
        entries.push({label: label, value: brand, icon: iconForKey(brand)});
    }
    entries.push({label: "Instructions", value: "Instructions", icon: ICON_INFO});
    entries.push({label: "Load", value: "Load", icon: ICON_LOAD});
    entries.push({label: "Exit", value: "Exit", icon: ICON_EXIT});

    var type = selectFromMenu("Key Decoding", entries, function (sel) {
        var total = brandNames.length;
        if (sel >= total) {
            return "";
        }
        return (sel + 1) + "/" + total;
    }, lastBrandMenuSelection);
    if (!type) type = "Exit";
    var selectedBrandIndex = brandNames.indexOf(type);
    if (selectedBrandIndex >= 0) {
        lastBrandMenuSelection = selectedBrandIndex;
    }

    if (type === "Instructions") {
        showInstructions();
        return chooseAndCreateKey();
    }

    var outline, show;

    if (type !== "Exit") {
        if (type === "Load") {
            key = new Key(type, "", "decode");
            var filePath = dialog.pickFile("/keys", {withFileTypes: true});
            if (!filePath) {
                return chooseAndCreateKey();
            }
            var fileContent = storage.read(filePath);
            if (!fileContent) {
                return chooseAndCreateKey();
            }
            key.load(fileContent);
        } else {
            var brandLabel = keys[String(type)].displayName || type;

            // Pin-count picker (icon menu). Each row carries the brand's glyph.
            var outlines = keys[String(type)].outlines || [];
            var outlineEntries = [];
            for (var j = 0; j < outlines.length; j++) {
                outlineEntries.push({
                    label: outlines[j],
                    value: outlines[j],
                    icon: iconForKey(type),
                    verified: isVerifiedOutline(type, outlines[j])
                });
            }
            outlineEntries.push({label: "Back", value: null, icon: ICON_BACK});

            outline = selectFromMenu(brandLabel, outlineEntries);
            if (!outline) { // null = Back chosen or backed out
                return chooseAndCreateKey();
            }

            // Mode picker (icon menu): Decode an existing key, or Random.
            show = selectFromMenu(brandLabel, [
                {label: "Decode", value: "decode", icon: ICON_DECODE},
                {label: "Random", value: "random", icon: ICON_RANDOM},
                {label: "Back", value: null, icon: ICON_BACK}
            ]);
            if (!show) {
                return chooseAndCreateKey();
            }
        }
    }

    if (type !== "Load") {
        key = new Key(type, outline, show);
    }
    if (type !== "Exit") {
        key.draw();
    }
}

if (!key) {
    chooseAndCreateKey();
}

while (true) {
    if (key.type === "Exit") {
        break;
    }

    if (keyboard.getSelPress()) {
        if (key.show === "random") {
            chooseAndCreateKey();
        } else {
            selectedPinIndex++;
            key.draw();
        }
    }

    if (keyboard.getNextPress()) {
        if (key.show === "random") {
            key.updatePins();
        } else if (key.show === "decode" && selectedPinIndex !== null && selectedPinIndex < key.pins.length) {
            var maxKeyCut = (keys[key.type] && keys[key.type].maxKeyCut) || 9;
            key.pins[selectedPinIndex] = Math.min(maxKeyCut - 1, key.pins[selectedPinIndex] + 1);
        } else if (selectedPinIndex === key.pins.length) { // Save action
            key.save();
        } else if (selectedPinIndex === key.pins.length + 1) { // Load action
            var filePath = dialog.pickFile("/keys", {withFileTypes: true});
            if (filePath) {
                var fileContent = storage.read(filePath);
                if (fileContent) {
                    key.load(fileContent);
                }
            }
        }
        key.draw();
    }

    if (keyboard.getPrevPress()) {
        if (key.show === "decode" && selectedPinIndex !== null && selectedPinIndex < key.pins.length) {
            key.pins[selectedPinIndex] = Math.max(0, key.pins[selectedPinIndex] - 1);
            key.draw();
        }
    }

    if (keyboard.getEscPress()) {
        chooseAndCreateKey();
    }
    delay(10);
}
