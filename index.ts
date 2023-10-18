import html2canvas from "html2canvas";
import { CONSTANTS, DEFAULTS } from "./constants";
import { HandlePrintScreen } from "./types";

export async function handlePrintScreen(props: HandlePrintScreen): Promise<string> {
    let isDragging = false;
    let initX = 0;
    let initY = 0;
    let base64PrintScreen = "";
    const root = document.getElementById(props.rootElementID) as HTMLElement;
    const rootCanvas = await html2canvas(root, DEFAULTS);
    rootCanvas.style.position = CONSTANTS.position;
    rootCanvas.style.top = CONSTANTS.top;
    rootCanvas.style.left = CONSTANTS.left;
    rootCanvas.style.cursor = props.cursorType
        ? props.cursorType
        : CONSTANTS.cursorType;
    const backgroundCanvasLayer = document.createElement("canvas");
    backgroundCanvasLayer.width = rootCanvas.width;
    backgroundCanvasLayer.height = rootCanvas.height;
    backgroundCanvasLayer.style.cursor = props.cursorType
        ? props.cursorType
        : CONSTANTS.cursorType;
    backgroundCanvasLayer.style.backgroundColor = props.backgroundColor
        ? props.backgroundColor
        : CONSTANTS.backgroundColor;
    backgroundCanvasLayer.style.opacity = props.opacity
        ? props.opacity
        : CONSTANTS.opacity;
    backgroundCanvasLayer.style.position = CONSTANTS.position;
    backgroundCanvasLayer.style.top = CONSTANTS.top;
    backgroundCanvasLayer.style.left = CONSTANTS.left;
    const backgroundContext = backgroundCanvasLayer.getContext(
        "2d"
    ) as CanvasRenderingContext2D;

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
        const printContext = printCanvas.getContext(
            "2d"
        ) as CanvasRenderingContext2D;
        printContext.drawImage(
            rootCanvas,
            initX + scrollX,
            initY + scrollY,
            e.clientX - initX,
            e.clientY - initY,
            0,
            0,
            e.clientX - initX,
            e.clientY - initY
        );
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
                : CONSTANTS.printAreaBorderColor;
            backgroundContext.lineWidth = props.printAreaBorderWidth
                ? props.printAreaBorderWidth
                : CONSTANTS.printAreaBorderWidth;
            backgroundContext.strokeRect(
                initX + scrollX,
                initY + scrollY,
                e.clientX - initX,
                e.clientY - initY
            );
            backgroundContext.drawImage(
                rootCanvas,
                initX + scrollX,
                initY + scrollY,
                e.clientX - initX,
                e.clientY - initY,
                initX + scrollX,
                initY + scrollY,
                e.clientX - initX,
                e.clientY - initY
            );
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

export async function printComponent(props: HandlePrintScreen): Promise<string> {
    let base64PrintScreen = "";
    const root = document.getElementById(props.rootElementID) as HTMLElement;
    const rootCanvas = await html2canvas(root, DEFAULTS);
    const dataURL = rootCanvas.toDataURL("image/png", 1.0);
    const image = new Image();
    image.src = dataURL;
    base64PrintScreen = dataURL;
    props.copyToClipboard && navigator.clipboard.writeText(image.src);

    return base64PrintScreen;
}