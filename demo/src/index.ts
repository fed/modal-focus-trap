import setUpFocusTrap from '../../dist';

let restoreFocus: Function | null;
const modalElement = document.querySelector('.modal') as HTMLElement;
const containerElement = document.querySelector('.container') as HTMLElement;
const openModalButtons = Array.from(
    document.querySelectorAll('.btn-open-modal')
) as HTMLElement[];
const closeModalButton = document.querySelector('.btn-close-modal') as HTMLElement;
const firstOpenModalButton = openModalButtons[0];

function openModal() {
    containerElement.classList.add('container--dimmed');
    modalElement.classList.add('modal--visible');
    document.addEventListener('keydown', setUpCloseWithEscape);
    restoreFocus = setUpFocusTrap(modalElement);
}

function closeModal() {
    containerElement.classList.remove('container--dimmed');
    modalElement.classList.remove('modal--visible');
    document.removeEventListener('keydown', setUpCloseWithEscape);

    if (restoreFocus) {
        restoreFocus();
        restoreFocus = null;
    }
}

function setUpCloseWithEscape(event: KeyboardEvent) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

openModalButtons.forEach(button => {
    button.addEventListener('click', openModal);
});
closeModalButton.addEventListener('click', closeModal);
firstOpenModalButton.focus();
