import {displayBigPhoto} from './modal-big-photos.js';

const pictureContainerElement = document.querySelector('.pictures'); //ищем куда складывать фото
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture'); //ищем шаблон
const pictureListFragment = document.createDocumentFragment();

/**
 * Функция по отрисовки миниатюр
 * @param {Object} drawThumbnails - массив объектов
 */
const renderThumbnails = (drawThumbnails) => {
  pictureContainerElement.querySelectorAll('.picture').forEach((element) => element.remove()); //удаление перересованных миниатюр для сортировки
  drawThumbnails.forEach((thumbnail) => { //перебираем эл массива отрисованных миниатюр
    const pictureElement = pictureTemplateElement.cloneNode(true); //клонирование элемента со всеми вложенностями

    const {url, description, likes, comments} = thumbnail; //деструктуризация объекта
    const img = pictureElement.querySelector('.picture__img'); //добавляем фото
    img.src = url;
    img.alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureContainerElement.append(pictureElement); //вставляем на страницу

    pictureElement.addEventListener('click', () => { //создаем замыкание
      displayBigPhoto(thumbnail);
    });

  });
  pictureContainerElement.append(pictureListFragment);
};

export {renderThumbnails};
