type HandlePrintScreen = {
    /**
     * The ID of the root element to capture for printing.
     *
     * @example "root"
     */
    rootElementID: string;
    /**
     * The background color for the print area.
     *
     * @example "#000"
     */
    backgroundColor?: string;
    /**
     * The opacity of the print area.
     *
     * @example "0.6"
     */
    opacity?: string;
    /**
     * The border width of the print area.
     *
     * @example 2
     */
    printAreaBorderWidth?: number;
    /**
     * The border color of the print area.
     *
     * @example "#000"
     */
    printAreaBorderColor?: string;
    /**
     * The type of cursor to use during printing.
     *
     * @example "crosshair"
     */
    cursorType?: string;
    /**
     * Whether to copy the captured content to the clipboard.
     *
     * @example true
     */
    copyToClipboard?: boolean;
};

declare function handlePrintScreen(props: HandlePrintScreen): Promise<string>;

export { handlePrintScreen };
