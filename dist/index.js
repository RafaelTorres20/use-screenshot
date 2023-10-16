"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePrintScreen = void 0;
const html2canvas_1 = __importDefault(require("html2canvas"));
const constants_1 = require("./constants");
async function handlePrintScreen(props) {
    let isDragging = false;
    let initX = 0;
    let initY = 0;
    let base64PrintScreen = "";
    const root = document.getElementById(props.rootElementID);
    const rootCanvas = await (0, html2canvas_1.default)(root, constants_1.DEFAULTS);
    rootCanvas.style.position = constants_1.CONSTANTS.position;
    rootCanvas.style.top = constants_1.CONSTANTS.top;
    rootCanvas.style.left = constants_1.CONSTANTS.left;
    rootCanvas.style.cursor = props.cursorType
        ? props.cursorType
        : constants_1.CONSTANTS.cursorType;
    const backgroundCanvasLayer = document.createElement("canvas");
    backgroundCanvasLayer.width = rootCanvas.width;
    backgroundCanvasLayer.height = rootCanvas.height;
    backgroundCanvasLayer.style.cursor = props.cursorType
        ? props.cursorType
        : constants_1.CONSTANTS.cursorType;
    backgroundCanvasLayer.style.backgroundColor = props.backgroundColor
        ? props.backgroundColor
        : constants_1.CONSTANTS.backgroundColor;
    backgroundCanvasLayer.style.opacity = props.opacity
        ? props.opacity
        : constants_1.CONSTANTS.opacity;
    backgroundCanvasLayer.style.position = constants_1.CONSTANTS.position;
    backgroundCanvasLayer.style.top = constants_1.CONSTANTS.top;
    backgroundCanvasLayer.style.left = constants_1.CONSTANTS.left;
    const backgroundContext = backgroundCanvasLayer.getContext("2d");
    root.appendChild(rootCanvas);
    root.appendChild(backgroundCanvasLayer);
    backgroundCanvasLayer.addEventListener("mousedown", (e) => {
        isDragging = true;
        initX = e.clientX;
        initY = e.clientY;
    });
    backgroundCanvasLayer.addEventListener("mouseup", (e) => {
        isDragging = false;
        const printCanvas = document.createElement("canvas");
        printCanvas.width = e.clientX - initX;
        printCanvas.height = e.clientY - initY;
        const printContext = printCanvas.getContext("2d");
        printContext.drawImage(rootCanvas, initX + scrollX, initY + scrollY, e.clientX - initX, e.clientY - initY, 0, 0, e.clientX - initX, e.clientY - initY);
        const dataURL = printContext.canvas.toDataURL("image/png", 1.0);
        const image = new Image();
        image.src = dataURL;
        base64PrintScreen = dataURL;
        props.copyToClipboard && navigator.clipboard.writeText(image.src);
    });
    backgroundCanvasLayer.addEventListener("mousemove", (e) => {
        if (isDragging) {
            backgroundContext.clearRect(0, 0, rootCanvas.width, rootCanvas.height);
            backgroundContext.strokeStyle = props.printAreaBorderColor
                ? props.printAreaBorderColor
                : constants_1.CONSTANTS.printAreaBorderColor;
            backgroundContext.lineWidth = props.printAreaBorderWidth
                ? props.printAreaBorderWidth
                : constants_1.CONSTANTS.printAreaBorderWidth;
            backgroundContext.strokeRect(initX + scrollX, initY + scrollY, e.clientX - initX, e.clientY - initY);
            backgroundContext.drawImage(rootCanvas, initX + scrollX, initY + scrollY, e.clientX - initX, e.clientY - initY, initX + scrollX, initY + scrollY, e.clientX - initX, e.clientY - initY);
        }
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            let canvas = document.getElementsByTagName("canvas")[0];
            if (canvas !== undefined) {
                root.removeChild(rootCanvas);
                root.removeChild(backgroundCanvasLayer);
            }
        }
    });
    return base64PrintScreen;
}
exports.handlePrintScreen = handlePrintScreen;
