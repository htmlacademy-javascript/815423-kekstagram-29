const bigFotoElement = document.querySelector('.big-picture');

//функция для чистоты кода
const isEscapeKey = (evt) => evt.key === 'Escape';
const isModalTarget = (evt) => evt.target === bigFotoElement;

const debounce = (cb, timeDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), timeDelay);
  };
};

export { isEscapeKey, isModalTarget, debounce };
