import {displayBigPhoto} from './modal-big-photos.js';

const pictureContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const pictureListFragment = document.createDocumentFragment();

const createThumbnail = (element) => {

    const pictureElement = pictureTemplateElement.cloneNode(true);

    const {url, description, likes, comments} = element;
    const imgElement = pictureElement.querySelector('.picture__img');
    imgElement.src = url;
    imgElement.alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureContainerElement.append(pictureElement);

    pictureElement.addEventListener('click', () => {
      displayBigPhoto(element);
    });
};

const renderThumbnails = (drawThumbnails) => {
  pictureContainerElement.querySelectorAll('.picture').forEach((element) => element.remove());
  drawThumbnails.forEach((thumbnail) => createThumbnail(thumbnail));
  pictureContainerElement.append(pictureListFragment);
};

export {renderThumbnails};
