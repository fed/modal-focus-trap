import {
    isFocusable,
    getFocusableElements,
    getKeyDownEventHandler,
    getDisengageFocusTrapCallback
} from './utils';

export default function setUpFocusTrap(
    context: HTMLElement,
    element?: HTMLElement
): (element?: HTMLElement) => void {
    const lastActiveElement = document.activeElement as HTMLElement;
    const focusableElements = getFocusableElements(context);
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    const keyDownEventHandler = getKeyDownEventHandler(
        firstFocusableElement,
        lastFocusableElement
    );

    // Engage focus trap.
    context.addEventListener('keydown', keyDownEventHandler);

    // Make sure to trap focus for screen readers.
    context.setAttribute('aria-modal', 'true');
    context.setAttribute('role', 'dialog');

    // Shift focus to one of the elements within the modal.
    const elementToFocus = isFocusable(element) ? element : firstFocusableElement;

    if (elementToFocus) {
        elementToFocus.focus();
    }

    // Return a callback that allows to disengage the focus trap
    // and also restore the focus back to the appropriate element in the page.
    return getDisengageFocusTrapCallback(
        context,
        keyDownEventHandler,
        lastActiveElement
    );
}
