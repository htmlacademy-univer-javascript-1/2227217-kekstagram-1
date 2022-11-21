import { scaleValue } from './scale.js';
import { changeEffect, removeFilter } from './effects.js';
import { sendData } from './api.js';
import { isValid } from './validation.js';
const uploadForm = document.querySelector('.img-upload__form');
const imgUploadStart = document.querySelector('.img-upload__start');
const imgEditor = document.querySelector('.img-upload__overlay');
const imgUploadPreview = imgEditor.querySelector('.img-upload__preview');
const fileUpload = document.querySelector('#upload-file');
const imgDescription = document.querySelector('.text__description');
const imgHashtags = document.querySelector('.text__hashtags');
const levelSlider = uploadForm.querySelector('.effect-level__slider');
const uploadSubmitButton = uploadForm.querySelector('.img-upload__submit');

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

const closeMessage = (message) => {
  document.body.removeChild(message);
};

const closeMessageByEscape = (evt, message) => {
  if (evt.keyCode === 27) {
    closeMessage(message);
    document.addEventListener('keydown', closeByEscape);
  }
};

const closeMessageByOutside = (evt, message) => {
  if (evt.target.className === 'error' || evt.target.className === 'success') {
    closeMessage(message);
  }
};

const generateMessage = (flag) => {
  let messageID = 0;
  if (flag) {
    messageID = document.querySelector('#success').content.querySelector('section');
  }
  else {
    messageID = document.querySelector('#error').content.querySelector('section');
  }
  const message = messageID.cloneNode(true);
  const button = message.querySelector('button');
  document.body.appendChild(message);
  button.onclick = () => closeMessage(message);
  message.onclick = (evt) => {
    closeMessageByOutside(evt, message);
  };
  document.addEventListener('keydown', (evt) => {
    closeMessageByEscape(evt, message);
  }, { once: true } );

};

const success = () => {
  removeForm();
  generateMessage(true);
};

const fail = () => {
  document.removeEventListener('keydown', closeByEscape);
  uploadSubmitButton.disabled = false;
  generateMessage(false);
};

const verifyForm = (evt) => {
  evt.preventDefault();
  if (isValid()) {
    uploadSubmitButton.disable = true;
    sendData(success, fail, new FormData(evt.target));
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
  uploadForm.addEventListener('submit', verifyForm);
  listenerAdder();
});
