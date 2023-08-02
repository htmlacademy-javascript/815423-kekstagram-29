import { sliderEffects } from './data-slider-effects.js';

const sliderEffectsList = document.querySelector('.effects__list'); // список эффектов
const effectValueElement = document.querySelector('.effect-level__value'); // ползунок слайдера для каждой li
const photoPreview = document.querySelector('.img-upload__preview img'); //загруженное фото для обрабоки
const sliderContainer = document.querySelector('.img-upload__effect-level'); //
const sliderElement = document.querySelector('.effect-level__slider');

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

const changeSliderFilters = (effect, value, unit) => {
  effectValueElement.value = value; //берёт значение из ползунка
  photoPreview.style.filter = `${effect}(${value}${unit})`; //шаблонная строка добавляет атрибут style
};

const showSlider = (effects) => {
  const {min, max, step} = effects;
  sliderContainer.classList.remove('hidden'); //показывается слайдер
  noUiSlider.create(sliderElement, {
    range: {
      min: min, //min
      max: max //max значение позунка
    },
    start: max, //при открытии всегда в max позиции
    step: step, //шаг ползунка
    connect: 'lower', //при использовании одной ручкой
    //tooltips: [true], //можно выводить подсказку
  });

  sliderElement.noUiSlider.on('update', () => { //обновление значения ползунка
    const sliderValue = sliderElement.noUiSlider.get();
    changeSliderFilters(effects.name, sliderValue, effects.unit);
  });
};

const resetEffect = () => {
  hideSlider(); //скрывается слайдер
  photoPreview.style.filter = null; //сбрасываем параметры у фото
  effectValueElement.value = null; //сбрасываем ползунок

  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
};

function onClickChangeEffect (evt) {
  resetEffect(); //сброс эффектов слайдера при переключении
  const effects = sliderEffects[evt.target.value];

  if (effects.name === 'none') {
    photoPreview.removeAttribute('style');
    return;
  }
  showSlider(effects);
}

const initSlider = () => {
  sliderEffectsList.addEventListener('change', onClickChangeEffect);
};

export {initSlider, hideSlider, resetEffect};
