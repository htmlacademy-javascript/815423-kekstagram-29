const NUMBER_OF_RANDOM_PHOTOS = 10; //кол-во случайных фото

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const photosFilter = document.querySelector('.img-filters'); // фильтрация изображений от других пользователей
let currentFilter = FilterType.DEFAULT;
let photos = []; //новый массив

/**
 * сортировка случайных фото
 */
const getSortRandom = () => Math.random() - 0.5;

/**
 * сортировка обсуждаемых фото
 * @param {Array} photoA массив коментариев
 * @param {Array} photoB массив коментариев
 */
const getSortingDiscussed = (photoA, photoB) => photoB.comments.length - photoA.comments.length;


/**
 * функция сортирующая фото по выбраному фильтру
 * @returns отсортированный массив фото
 */
const getSortedPhotos = () => {
  switch(currentFilter) {
    case FilterType.RANDOM:
      return [...photos].sort(getSortRandom).slice(0, NUMBER_OF_RANDOM_PHOTOS); //обрезаем отсортированный массив
    case FilterType.DISCUSSED:
      return [...photos].sort(getSortingDiscussed);// копируем поверхостно массив, потом .sort()
    default:
      return [...photos];
  }
};

/**
 * функция по  навешиванию клика по фильтрам сортировки
 * @param {*} cb с отрисоваными фото по выбранаму фильтру
 */
const onClickFilter = (cb) => {
  photosFilter.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button') && evt.target.id !== currentFilter) { //клик по фильтру

      const clickBtn = evt.target;
      const activeButton = photosFilter.querySelector('.img-filters__button--active');
      activeButton.classList.remove('img-filters__button--active');
      clickBtn.classList.add('img-filters__button--active');
      currentFilter = clickBtn.id; //id выбраного фильтра
      cb(getSortedPhotos());
    }
  });
};
document.removeEventListener('keydown', onClickFilter);
/**
 * функция показывает фильтры
 * @param {Array} photosData - загруженные с сервера фото
 * @param {*} cb
 */
const showingFilteredPhotos = (photosData, cb) =>{
  photosFilter.classList.remove('img-filters--inactive');
  photos = [...photosData]; //создаем новый массив и отдаем его наружу
  onClickFilter(cb);
};

export { showingFilteredPhotos };
