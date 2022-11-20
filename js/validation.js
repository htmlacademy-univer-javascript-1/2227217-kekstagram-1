const imgHashTags = document.querySelector('.text__hashtags');
const imgDescription = document.querySelector('.text__description');
const form = document.querySelector('.img-upload__form');

const hashtagsRegex = /^#[0-9a-zA-Zа-яА-ЯёЁ]{1,19}$/;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__item--invalid',
  successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const stopHandlerWhenFocus = (evt) => {
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
};

const hashtagsHandler = (value) => {
  value = value.toLowerCase().trim();
  if (!value) {
    return true;
  }
  const hashtags = value.split(/\s+/);
  const setOfHashtags = [...new Set(hashtags)];
  for (const hashtag of setOfHashtags) {
    if (!hashtagsRegex.test(hashtag)) {
      return false;
    }
  }
  return hashtags.length <= 5 && hashtags.length === setOfHashtags.length;
};

const commentHandler = (value) => value.length <= 140;

pristine.addValidator(imgHashTags, hashtagsHandler, 'Incorrect hashtag');
pristine.addValidator(imgDescription, commentHandler, 'Comment length must be no more than 140 symbols');

imgHashTags.onkeydown = stopHandlerWhenFocus;
imgDescription.onkeydown = stopHandlerWhenFocus;

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
