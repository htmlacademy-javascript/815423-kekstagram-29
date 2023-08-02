const MAX_HASHTAGS = 5;
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const ERROR_TEXT = {
  invalidCount: `нельзя указать больше ${MAX_HASHTAGS} хэш-тэгов`,
  invalidHashtag: 'не верно введен хеш-тег',
  notUnique: 'хэш-тэги не должны повторяться',
};

const uploadForm = document.querySelector('.img-upload__form'); //форма загрузки
const hashtagsText = uploadForm.querySelector('.text__hashtags'); //input для заполнения хештегов
const commentText = uploadForm.querySelector('.text__description'); //input для коментария

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const isInputFocus = () => {
  if (document.activeElement === hashtagsText || document.activeElement === commentText) {
    return true;
  }
};

const normalHashtag = (tags) => tags
  .trim().split(' ').filter((hashtag) => Boolean(hashtag.length));

const validateInvalidHashtag = (value) => normalHashtag(value).every((item) => (item.match(VALID_HASHTAG)));

const validateNumberOfHashtags = (value) => normalHashtag(value).length <= MAX_HASHTAGS;

const validateRepeatedHashtags = (value) => {
  const tagArray = normalHashtag(value).map((tag) => tag.toLowerCase());
  return tagArray.length === new Set(tagArray).size;
};

// набор из валидаторов
pristine.addValidator(hashtagsText, validateNumberOfHashtags, ERROR_TEXT.invalidCount, 3, true);
pristine.addValidator(hashtagsText, validateInvalidHashtag, ERROR_TEXT.invalidHashtag, 2, true);
pristine.addValidator(hashtagsText, validateRepeatedHashtags,ERROR_TEXT.notUnique, 1, true);

export { pristine, isInputFocus };
