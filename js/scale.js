const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE_VALUE = 100;

const smallerBtnElement = document.querySelector('.scale__control--smaller');
const biggerBtnElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const photoElement = document.querySelector('.img-upload__preview img');

/**
 * Функция по преобразованию получаемого значения
 * @param {number} value получаемое значение
 */
const scalePhoto = (value) => {
  photoElement.style.transform = `scale(${value / 100 })`; // передаём процент масштаба изображения
  scaleValueElement.value = `${value}%`; // отображаемое значение в поле ввода
};

/**
 * функция по уменьшению фото при клике
 */
const onSmallerBtnClick = () => {
  scalePhoto (
    Math.max(parseInt(scaleValueElement.value, 10) - SCALE_STEP, MIN_SCALE) //возращаем большее число
  );
};

/**
 * функция по увеличению при клике
 */
const onBiggerBtnClick = () => {
  scalePhoto (
    Math.min(parseInt(scaleValueElement.value, 10) + SCALE_STEP, MAX_SCALE) //возращаем меньшее число
  );
};

const resetScale = () => scalePhoto(DEFAULT_SCALE_VALUE);

const initScale = () => {
  smallerBtnElement.addEventListener('click', onSmallerBtnClick);
  biggerBtnElement.addEventListener('click', onBiggerBtnClick);
};

export { resetScale, initScale };
