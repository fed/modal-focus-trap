import isElement from 'lodash/isElement';
import isFunction from 'lodash/isFunction';
import { FOCUSABLE_ELEMENTS } from './constants';

export function isFocusable(element: any) {
    return isElement(element) && isFunction(element.focus);
}

export function isVisible(element: HTMLElement) {
    return !!(
        element.offsetWidth ||
        element.offsetHeight ||
        element.getClientRects().length
    );
}

export function isTabKeyPressed(event: KeyboardEvent) {
    return event.key === 'Tab' || event.which === 9;
}

export function getFocusableElements(context: HTMLElement): HTMLElement[] {
    const focusableElements = Array.from(
        context.querySelectorAll(FOCUSABLE_ELEMENTS.join())
    ) as HTMLElement[];
    const visibleFocusableElements = focusableElements.filter(isVisible);

    if (visibleFocusableElements.length === 0) {
        throw new TypeError(
            'There are no focusable elements in the context provided'
        );
    }

    return visibleFocusableElements;
}

export function getKeyDownEventHandler(
    firstElement: HTMLElement,
    lastElement: HTMLElement
) {
    return function(event: KeyboardEvent) {
        if (!isTabKeyPressed(event)) {
            return;
        }

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    };
}

export function getDisengageFocusTrapCallback(
    context: HTMLElement,
    keyDownEventHandler: (event: KeyboardEvent) => void,
    lastActiveElement: HTMLElement
) {
    return function (element?: HTMLElement) {
        context.removeEventListener('keydown', keyDownEventHandler);

        const elementToRestoreFocusTo =
            (isFocusable(element) && element) ||
            (isFocusable(lastActiveElement) && lastActiveElement);

        if (elementToRestoreFocusTo) {
            elementToRestoreFocusTo.focus();
        }
    };
}
