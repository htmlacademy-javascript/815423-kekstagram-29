import { isEscapeKey } from './util.js';
import { pristine, isInputFocus } from './form-validation.js';
import { initSlider, hideSlider, resetEffect } from './slider.js';
import { resetScale, initScale } from './scale.js';

const FILE_TYPES = ['gif', 'webp', 'jpeg', 'png', 'avif', 'jpg', 'svg'];

const SubmitBtnText = {
  UNBLOCK: 'Сохранить',
  BLOCK: 'Сохраняю...'
};

const uploadForm = document.querySelector('.img-upload__form'); //форма загрузки
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay'); //подложка
const uploadInput = uploadForm.querySelector('.img-upload__input'); //контрол загрузки файла
const uploadCancel = uploadForm.querySelector('.img-upload__cancel'); //кнопка закрыть
const submitBtn = uploadForm.querySelector('.img-upload__submit'); //кнопка отправить
const photoEffectPreviews = document.querySelectorAll('.effects__preview'); //наложение эффекта на изображение
const photoPreview = document.querySelector('.img-upload__preview img'); //загруженное фото для обрабоки

function onCloseOverlayKeydown (evt) {
  if (isEscapeKey(evt) && !(isInputFocus())) {
    evt.preventDefault();
    closeUserOverlay();
  }
}

const openUserOverlay = () => {
  initSlider();
  initScale();
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onCloseOverlayKeydown);
  hideSlider();
};

function closeUserOverlay () {
  uploadForm.reset();
  resetScale();
  resetEffect();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseOverlayKeydown);
}

const showUploadPhoto = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matchs = FILE_TYPES.some((extention) => fileName.endsWith(extention));

  if (matchs) {
    photoPreview.src = URL.createObjectURL(file);
    photoEffectPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${photoPreview.src})`;
    });
  }
};

uploadCancel.addEventListener('click', () => {
  closeUserOverlay();
});

uploadInput.addEventListener('change', () => {
  openUserOverlay();
  showUploadPhoto();
});

uploadForm.addEventListener('submit', (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();
  }
});

const blockSubmitBtn = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = SubmitBtnText.BLOCK;
};

const unblockSubmitBtn = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = SubmitBtnText.UNBLOCK;
};

const setOnFormSubmit = (cb) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitBtn();
      await cb(new FormData(uploadForm));
      unblockSubmitBtn();
    }
  });
};

export { setOnFormSubmit, closeUserOverlay, openUserOverlay, onCloseOverlayKeydown };
