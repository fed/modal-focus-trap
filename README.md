# modal-focus-trap

[![Downloads](https://img.shields.io/npm/dm/modal-focus-trap)](https://npm.im/modal-focus-trap)
[![Version](https://img.shields.io/npm/v/modal-focus-trap)](https://npm.im/modal-focus-trap)
[![License](https://img.shields.io/npm/l/modal-focus-trap)](https://opensource.org/licenses/MIT)

This is a very simple and lightweight helper function that makes it easier to set up a focus trap in a modal window. This implementation is not library specific and can therefore be used with VanillaJS, React or any other library/framework.

## How to use

First import the helper function. You don't necessarily need to name it `focusTrap`, you can use any name you want.

```js
import focusTrap from 'modal-focus-trap';
```

Set up the focus trap by passing in an `HTMLElement` which is your modal element. The function returns a callback you can use later on to disengage the focus trap. Cache this callback somewhere in your code, you will need it later.

```js
const modalElement = document.querySelector('.modal');
let restoreFocus = focusTrap(modalElement);
```

After closing the modal, you need to disengage the focus trap and restore the focus to the previously focused element by invoking the callback:

```js
if (restoreFocus) {
    restoreFocus();
    restoreFocus = null;
}
```
