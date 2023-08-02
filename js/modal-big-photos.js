import { isEscapeKey, isModalTarget } from './util.js';

const SHOW_COMMENTS_STEP = 5;

const bigPhotoElement = document.querySelector('.big-picture');
const commentsListElement = bigPhotoElement.querySelector('.social__comments');
const commentItemElement = bigPhotoElement.querySelector('.social__comment');
const commentsCountElement = bigPhotoElement.querySelector('.social__comment-count');
const btnDownloadMoreElement = bigPhotoElement.querySelector('.comments-loader');
const bigPhotoCloseElement = bigPhotoElement.querySelector('.big-picture__cancel');
let comments;
let commentsShown = 0;

const fillcommentsCountElementer = () => {
  commentsCountElement.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const setButtonState = () => {
  if (commentsShown >= comments.length) {
    btnDownloadMoreElement.classList.add('hidden');
    return;
  }
  btnDownloadMoreElement.classList.remove('hidden');
};

const renderComment = ({avatar, name, message}) => {
  const comment = commentItemElement.cloneNode(true);
  const pictureComment = comment.querySelector('.social__picture');
  pictureComment.src = avatar;
  pictureComment.alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

const renderComments = () => {
  const fragment = document.createDocumentFragment();
  const currentComments = comments.slice(commentsShown, commentsShown + SHOW_COMMENTS_STEP);
  commentsShown = Math.min(commentsShown + SHOW_COMMENTS_STEP, comments.length);

  currentComments.forEach((comment) => fragment.append(renderComment(comment)));
  commentsListElement.append(fragment);
  setButtonState();
  fillcommentsCountElementer();
};

function onShowMoreButtonClick (evt) {
  evt.preventDefault();
  renderComments();
}

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserBigFoto();
  }
};

const onBodyClick = (evt) => {
  if (isModalTarget(evt)) {
    evt.preventDefault();
    closeUserBigFoto();
  }
};

const openUserBigPhoto = () => {
  bigPhotoElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onBodyClick);
  btnDownloadMoreElement.addEventListener('click', onShowMoreButtonClick);
};

function closeUserBigFoto () {
  bigPhotoElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onBodyClick);
  btnDownloadMoreElement.removeEventListener('click', onShowMoreButtonClick);
}

bigPhotoCloseElement.addEventListener('click', () => {
  closeUserBigFoto();
});

const fillBigPhoto = ({url, likes, description, messages}) => {
  const bigPhoto = bigPhotoElement.querySelector('.big-picture__img img');
  bigPhoto.src = url;
  bigPhoto.alt = description;
  bigPhotoElement.querySelector('.likes-count').textContent = likes;
  bigPhotoElement.querySelector('.social__caption').textContent = description;
  renderComments(messages);
};

const displayBigPhoto = (data) => {
  commentsListElement.innerHTML = '';
  comments = data.comments;
  openUserBigPhoto();
  fillBigPhoto(data);
};

export {displayBigPhoto};
