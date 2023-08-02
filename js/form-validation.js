const MAX_HASHTAGS = 5;
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const StatusErrorText = {
  INVALIDCOUNT: `нельзя указать больше ${MAX_HASHTAGS} хэш-тэгов`,
  INVALIDHASHTAG: 'не верно введен хеш-тег',
  NOTUNIQUE: 'хэш-тэги не должны повторяться',
};

const uploadForm = document.querySelector('.img-upload__form');
const hashtagsText = uploadForm.querySelector('.text__hashtags');
const commentText = uploadForm.querySelector('.text__description');

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

const createHashtag = (value) => value
  .trim().toLowerCase().split(' ').filter((hashtag) => hashtag);

const validateInvalidHashtag = (value) => createHashtag(value).every((item) => (item.match(VALID_HASHTAG)));

const validateNumberOfHashtags = (value) => createHashtag(value).length <= MAX_HASHTAGS;

const validateRepeatedHashtags = (value) => {
  const tagArray = createHashtag(value);
  return tagArray.length === new Set(tagArray).size;
};

pristine.addValidator(hashtagsText, validateNumberOfHashtags, StatusErrorText.INVALIDCOUNT, 3, true);
pristine.addValidator(hashtagsText, validateInvalidHashtag, StatusErrorText.INVALIDHASHTAG, 2, true);
pristine.addValidator(hashtagsText, validateRepeatedHashtags,StatusErrorText.NOTUNIQUE, 1, true);

export { pristine, isInputFocus };
