const NUMBER_OF_RANDOM_PHOTOS = 10;

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const photosFilter = document.querySelector('.img-filters');
let currentFilter = FilterType.DEFAULT;
let photos = [];

const getSortRandom = () => Math.random() - 0.5;
const getSortingDiscussed = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const getSortedPhotos = () => {
  switch(currentFilter) {
    case FilterType.RANDOM:
      return [...photos].sort(getSortRandom).slice(0, NUMBER_OF_RANDOM_PHOTOS);
    case FilterType.DISCUSSED:
      return [...photos].sort(getSortingDiscussed);
    default:
      return [...photos];
  }
};

const initFilters = (cb) => {
  photosFilter.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button') && evt.target.id !== currentFilter) {

      const clickBtn = evt.target;
      const activeButton = photosFilter.querySelector('.img-filters__button--active');
      activeButton.classList.remove('img-filters__button--active');
      clickBtn.classList.add('img-filters__button--active');
      currentFilter = clickBtn.id;
      cb(getSortedPhotos());
    }
  });
};

const showingFilteredPhotos = (photosData, cb) =>{
  photosFilter.classList.remove('img-filters--inactive');
  photos = [...photosData];
  initFilters(cb);
};

export { showingFilteredPhotos };
