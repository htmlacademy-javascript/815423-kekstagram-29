const bigFotoElement = document.querySelector('.big-picture'); //модальное окно

//функция для чистоты кода
const isEscapeKey = (evt) => evt.key === 'Escape';
const isModalTarget = (evt) => evt.target === bigFotoElement;

/**
 * устранение дребезга
 * @param cb
 * @param {number} timeDelay - задержка в миллисекундах
 * @returns
 */
const debounce = (cb, timeDelay = 500) => {
  let timeoutId; //используем замыкания
  return (...rest) => {
    clearTimeout(timeoutId); //удаляем предыдущий таймаут
    timeoutId = setTimeout(() => cb.apply(this, rest), timeDelay); //устанавливаем новый таймаут с вызовом cb на ту же задержку
  };
};

export { isEscapeKey, isModalTarget, debounce };
