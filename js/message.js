import { isEscapeKey } from './util.js';
import { onCloseOverlayKeydown } from './form-upload-user.js';

const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');

const typeMessage = () => document.querySelector('.error, .success');

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseMessage();
  }
}

const isMessageTarget = (evt) => evt.target === typeMessage();

const onBodyClick = (evt) => {
  if (isMessageTarget(evt)) {
    evt.preventDefault();
    onCloseMessage();
  }
};

function onCloseMessage () {
  if (typeMessage()) {
    typeMessage().remove();
  }
  document.addEventListener('keydown', onCloseOverlayKeydown);
  document.removeEventListener('click', onBodyClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const showMessage = (messageElement, closeBtnClass) => {
  document.body.append(messageElement);
  document.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
  messageElement.querySelector(closeBtnClass).addEventListener('click', onCloseMessage);
};

const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
  document.removeEventListener('keydown', onCloseOverlayKeydown);
};

export {showSuccessMessage, showErrorMessage };
