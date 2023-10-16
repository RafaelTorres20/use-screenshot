"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULTS = exports.CONSTANTS = void 0;
exports.CONSTANTS = {
    rootElementID: "root",
    backgroundColor: "#000",
    opacity: "0.6",
    printAreaBorderWidth: 2,
    printAreaBorderColor: "#000",
    cursorType: "crosshair",
    position: "absolute",
    top: "0",
    left: "0",
};
exports.DEFAULTS = {
    foreignObjectRendering: true,
    windowHeight: document.documentElement.clientHeight,
    windowWidth: document.documentElement.clientWidth,
    removeContainer: true,
    scale: 1,
    allowTaint: true,
    useCORS: true,
    logging: true,
};
