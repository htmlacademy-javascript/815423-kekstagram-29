const DELAY = 500;

const bigPhotoElement = document.querySelector('.big-picture');

const isEscapeKey = (evt) => evt.key === 'Escape';
const isModalTarget = (evt) => evt.target === bigPhotoElement;

const debounce = (cb, timeDelay = DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), timeDelay);
  };
};

export { isEscapeKey, isModalTarget, debounce };
