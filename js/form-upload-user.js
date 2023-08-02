import { isEscapeKey } from './util.js';
import { pristine, isInputFocus } from './form-validation.js';
import { initSlider, hideSlider, resetEffect } from './slider.js';
import { resetScale, initScale } from './scale.js';

const FILE_TYPES = ['.gif', '.webp', '.jpeg', '.png', '.avif', '.jpg', '.svg'];

const submitBtnElementText = {
  UNBLOCK: 'Сохранить',
  BLOCK: 'Сохраняю...'
};

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadCancelElement = uploadFormElement.querySelector('.img-upload__cancel');
const submitBtnElement = uploadFormElement.querySelector('.img-upload__submit');
const photoEffectPreviewsElement = document.querySelectorAll('.effects__preview');
const photoPreviewElement = document.querySelector('.img-upload__preview img');

function onCloseOverlayKeydown (evt) {
  if (isEscapeKey(evt) && !(isInputFocus())) {
    evt.preventDefault();
    closeUserOverlay();
  }
}

const openUserOverlay = () => {
  initSlider();
  initScale();
  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onCloseOverlayKeydown);
  hideSlider();
};

function closeUserOverlay () {
  uploadFormElement.reset();
  resetScale();
  resetEffect();
  pristine.reset();
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseOverlayKeydown);
}

const showUploadPhoto = () => {
  const file = uploadInputElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((extention) => fileName.endsWith(extention));

  if (matches) {
    const src = URL.createObjectURL(file);
    photoPreviewElement.src = src;
    photoEffectPreviewsElement.forEach((preview) => {
      preview.style.backgroundImage = `url(${src})`;
    });
  }
};

uploadCancelElement.addEventListener('click', () => {
  closeUserOverlay();
});

uploadInputElement.addEventListener('change', () => {
  openUserOverlay();
  showUploadPhoto();
});

uploadFormElement.addEventListener('submit', (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();
  }
});

const blocksubmitBtnElement = () => {
  submitBtnElement.disabled = true;
  submitBtnElement.textContent = submitBtnElementText.BLOCK;
};

const unblocksubmitBtnElement = () => {
  submitBtnElement.disabled = false;
  submitBtnElement.textContent = submitBtnElementText.UNBLOCK;
};

const setOnFormSubmit = (cb) => {
  uploadFormElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blocksubmitBtnElement();
      await cb(new FormData(uploadFormElement));
      unblocksubmitBtnElement();
    }
  });
};

export { setOnFormSubmit, closeUserOverlay, openUserOverlay, onCloseOverlayKeydown };
