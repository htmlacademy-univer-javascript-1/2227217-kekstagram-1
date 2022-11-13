const imgUploadStart = document.querySelector('.img-upload__start');
const imgEditor = document.querySelector('.img-upload__overlay');
const fileUpload = document.querySelector('#upload-file');
const imgDescription = document.querySelector('.text__description');
const imgHashtags = document.querySelector('.text__hashtags');

const removeForm = () => {
  imgEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  fileUpload.value = '';
  imgDescription.value = '';
  imgHashtags.value = '';
};

const closeByEscape = (keyEvent) => {
  if (keyEvent.keyCode === 27) {
    removeForm();
    document.removeEventListener('keydown', closeByEscape);
  }
};

const listenerAdder = () => {
  document.addEventListener('keydown', closeByEscape);
  imgEditor.querySelector('.img-upload__cancel').addEventListener('click', () => {
    removeForm();
    document.removeEventListener('keydown', closeByEscape);
  });
};

imgUploadStart.addEventListener('change', () => {
  imgEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  listenerAdder();
});

