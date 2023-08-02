import { isEscapeKey, isModalTarget } from './util.js';

const SHOW_COMMENTS_STEP = 5;

const bigFotoElement = document.querySelector('.big-picture'); //модальное окно
const commentsList = bigFotoElement.querySelector('.social__comments'); //список коментов
const commentItem = bigFotoElement.querySelector('.social__comment'); //один комент
const commentsCount = bigFotoElement.querySelector('.social__comment-count'); //5 коментариев
const btnDownloadMore = bigFotoElement.querySelector('.comments-loader'); //кнопка загрузить еще
const bigFotoCloseElement = bigFotoElement.querySelector('.big-picture__cancel'); //кнопка закрыть
let comments;
let commentsShown = 0;

/**
 * функция по созданию живой строки
 */
const fillCommentsCounter = () => {
  commentsCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

/**
 * функция по показу кнопки загрузить еще
 * @returns
 */
const setButtonState = () => {
  if (commentsShown >= comments.length) {
    btnDownloadMore.classList.add('hidden');
    return;
  }
  btnDownloadMore.classList.remove('hidden');
};

/**
 * Функция по отрисовки одного комментария
 * @param {object} деструктуризация параметров обьекта данных
 * @returns возращаем шаблон одного коментария
 */
const renderComment = ({avatar, name, message}) => {
  const comment = commentItem.cloneNode(true);
  const pictureComment = comment.querySelector('.social__picture');
  pictureComment.src = avatar;
  pictureComment.alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

/**
 * Функция по отрисовке коментариев
 */
const renderComments = () => {
  const fragment = document.createDocumentFragment();
  const currentComments = comments.slice(commentsShown, commentsShown + SHOW_COMMENTS_STEP); //показ выбранных коментариеы из массива
  commentsShown = Math.min(commentsShown + SHOW_COMMENTS_STEP, comments.length); //вместо цикла проверки, обрезание значения

  currentComments.forEach((comment) => fragment.append(renderComment(comment)));
  commentsList.append(fragment);
  setButtonState(); //показ кнопки
  fillCommentsCounter(); //показ живой строки
};

/**
 * функция по отбражению коментов, при нажатии на кнопку
 * @param {object} evt объект события
 */
function onShowMoreButtonClick (evt) {
  evt.preventDefault();
  renderComments();
}

/**
 * функция для закрытия модального окна с помощью клавиатуры
 * @param {object} evt объект события
 */
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserBigFoto();
  }
};

/**
 * функция для закрытия модального окна при клике по документу
 * @param {object} evt объект события
 */
const onBodyClick = (evt) => {
  if (isModalTarget(evt)) {
    evt.preventDefault();
    closeUserBigFoto();
  }
};

/**
 * функция по открытию модального окна
 */
const openUserBigPhoto = () => {
  bigFotoElement.classList.remove('hidden'); // 1. Показать окно
  document.body.classList.add('modal-open');//2. отключаем скрол под подложкой
  document.addEventListener('keydown', onDocumentKeydown); // 3. Добавить обработчики для закрытия на клавишу
  document.addEventListener('click', onBodyClick); // 4. Добавить обработчики для закрытия на клик вне модального окна
  btnDownloadMore.addEventListener('click', onShowMoreButtonClick); // 5. Добавить обработчики для кнопки загрузить еще
};

/**
 * функция по закрытию модального окна
 */
function closeUserBigFoto () {
  bigFotoElement.classList.add('hidden'); // 1. Скрыть окно
  document.body.classList.remove('modal-open');// 2. включить скрол
  document.removeEventListener('keydown', onDocumentKeydown); //3. удалить обработчик событий при нажатии на клавишу
  document.removeEventListener('click', onBodyClick); //4. удалить обработчик событий при клике вне модального окна
  btnDownloadMore.removeEventListener('click', onShowMoreButtonClick); //5. удалить обработчик событий для кнопки загрузить еще
  commentsShown = 0;
}

bigFotoCloseElement.addEventListener('click', () => {
  closeUserBigFoto();
});

/**
 * функция по наполнению большой картинки данными
 * @param {object} деструктуризация параметров обьекта данных
 */
const fillBigPhoto = ({url, likes, description, messages}) => {
  const bigPhoto = bigFotoElement.querySelector('.big-picture__img img');
  bigPhoto.src = url; //Адрес изображения
  bigPhoto.alt = description; //описание фото
  bigFotoElement.querySelector('.likes-count').textContent = likes; //количество лайков
  bigFotoElement.querySelector('.social__caption').textContent = description; //описание фото
  renderComments(messages); //отрисованные коменты
};

/**
 * функция по созданию фото с коментариями
 * @param {object} data массив обектов данных
 */
const displayBigPhoto = (data) => {
  commentsList.innerHTML = ''; //очищаем список коментариев
  comments = data.comments; //созданному массиву присваиваем массив комментариев из объекта
  openUserBigPhoto(); //открытие модалки
  fillBigPhoto(data); //наполненеие данными
};

export {displayBigPhoto};
