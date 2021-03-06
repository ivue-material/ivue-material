interface IE8HTMLInputElement extends HTMLInputElement {
    attachEvent(event: string, listener: EventListener): boolean;
}

/* istanbul ignore next */
export const on = (
    element: HTMLElement | Document | Window,
    event: string,
    handler: EventListenerOrEventListenerObject,
    useCapture = false,
): void => {
    if (element && event && handler) {
        element.addEventListener(event, handler, useCapture);
    }
}


/* istanbul ignore next */
export const off = (
    element: HTMLElement | Document | Window,
    event: string,
    handler: EventListenerOrEventListenerObject,
    useCapture = false
): void => {
    if (element && event && handler) {
        element.removeEventListener(event, handler, useCapture)
    }
}
