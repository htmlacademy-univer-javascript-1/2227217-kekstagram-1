import { scaleValue } from './scale.js';
import { changeEffect, removeFilter } from './effects.js';
const uploadForm = document.querySelector('.img-upload__form');
const imgUploadStart = document.querySelector('.img-upload__start');
const imgEditor = document.querySelector('.img-upload__overlay');
const imgUploadPreview = imgEditor.querySelector('.img-upload__preview');
const fileUpload = document.querySelector('#upload-file');
const imgDescription = document.querySelector('.text__description');
const imgHashtags = document.querySelector('.text__hashtags');
const levelSlider = uploadForm.querySelector('.effect-level__slider');

const removeForm = () => {
  imgEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  fileUpload.value = '';
  imgDescription.value = '';
  imgHashtags.value = '';
  uploadForm.removeEventListener('change', changeEffect);
  removeFilter();
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
  }, { once: true } );
  scaleValue.value ='100%';
  imgUploadPreview.style = `transform: scale(${scaleValue})`;
};

imgUploadStart.addEventListener('change', () => {
  imgEditor.classList.remove('hidden');
  levelSlider.classList.add('hidden');
  document.body.classList.add('modal-open');
  uploadForm.addEventListener('change', changeEffect);
  listenerAdder();
});

