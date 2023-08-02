import { isEscapeKey } from './util.js';
import { onCloseOverlayKeydown } from './form-upload-user.js';

const errorMessage = document.querySelector('#error').content.querySelector('.error'); //cообщение с ошибкой загрузки изображения
const successMessage = document.querySelector('#success').content.querySelector('.success'); //cообщение об успешной загрузке изображения

/**
 * тип сообщения
 */
const typeMessage = () => document.querySelector('.error, .success');

/**
 * функция для закрытия сообщения с помощью клавиатуры
 * @param {object} evt объект события
 */
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseMessage();
  }
}

const isMessageTarget = (evt) => evt.target === typeMessage();

/**
 * функция для закрытия сообщения при клике по документу
 * @param {object} evt объект события
 */
const onBodyClick = (evt) => {
  if (isMessageTarget(evt)) {
    evt.preventDefault();
    onCloseMessage();
  }
};

/**
 * функция закрытия сообщения
 */
function onCloseMessage () {
  if (typeMessage()) {
    typeMessage().remove();
  }
  document.addEventListener('keydown', onCloseOverlayKeydown); //добавить обработчик событий при нажатии на клавишу
  document.removeEventListener('click', onBodyClick); //удалить обработчик событий при клике вне сообщеня окна
  document.removeEventListener('keydown', onDocumentKeydown); // удалить обработчик событий при нажатии на клавишу
}

/**
 * общая функция по показу сообщения
 * @param {*} messageElement сообщение
 * @param {*} closeBtnClass класс кнопки
 */
const showMessage = (messageElement, closeBtnClass) => {
  document.body.append(messageElement); //добавляем элемент
  document.addEventListener('click', onBodyClick); //добавит обработчик событий при клике вне сообщеня окна
  document.addEventListener('keydown', onDocumentKeydown); // добавит обработчик событий при нажатии на клавишу
  messageElement.querySelector(closeBtnClass).addEventListener('click', onCloseMessage); //закрытие сообщения
};

/**
 * функция по показу сообщения об успешной загрузки изображения
 */
const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};

/**
 * функция по показу сообщения с ошибкой загрузки изображения
 */
const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
  document.removeEventListener('keydown', onCloseOverlayKeydown); //удалить обработчик событий при нажатии на клавишу
};

export {showSuccessMessage, showErrorMessage };
