const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE_VALUE = 100;
const DIVIDER = 100;

const smallerBtnElement = document.querySelector('.scale__control--smaller');
const biggerBtnElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const photoElement = document.querySelector('.img-upload__preview img');

const scalePhoto = (value) => {
  photoElement.style.transform = `scale(${value / DIVIDER })`;
  scaleValueElement.value = `${value}%`;
};

const onSmallerBtnClick = () => {
  scalePhoto (
    Math.max(parseInt(scaleValueElement.value, 10) - SCALE_STEP, MIN_SCALE)
  );
};

const onBiggerBtnClick = () => {
  scalePhoto (
    Math.min(parseInt(scaleValueElement.value, 10) + SCALE_STEP, MAX_SCALE)
  );
};

const resetScale = () => scalePhoto(DEFAULT_SCALE_VALUE);

const initScale = () => {
  smallerBtnElement.addEventListener('click', onSmallerBtnClick);
  biggerBtnElement.addEventListener('click', onBiggerBtnClick);
};

export { resetScale, initScale };
