import { SliderEffects } from './data-slider-effects.js';

const sliderEffectsListElement = document.querySelector('.effects__list');
const effectValueElement = document.querySelector('.effect-level__value');
const photoPreviewElement = document.querySelector('.img-upload__preview img');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const changeSliderFilters = (effect, value, unit) => {
  effectValueElement.value = value;
  photoPreviewElement.style.filter = `${effect}(${value}${unit})`;
};

const showSlider = (effects) => {
  const {min, max, step} = effects;
  sliderContainerElement.classList.remove('hidden');
  noUiSlider.create(sliderElement, {
    range: {
      min: min,
      max: max
    },
    start: max,
    step: step,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', () => {
    const sliderValue = sliderElement.noUiSlider.get();
    changeSliderFilters(effects.name, sliderValue, effects.unit);
  });
};

const resetEffect = () => {
  hideSlider();
  photoPreviewElement.style.filter = null;
  effectValueElement.value = null;

  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
};

function onClickChangeEffect (evt) {
  resetEffect();
  const effects = SliderEffects[evt.target.value];

  if (effects.name === 'none') {
    photoPreviewElement.removeAttribute('style');
    return;
  }
  showSlider(effects);
}

const initSlider = () => {
  sliderEffectsListElement.addEventListener('change', onClickChangeEffect);
};

export {initSlider, hideSlider, resetEffect};
