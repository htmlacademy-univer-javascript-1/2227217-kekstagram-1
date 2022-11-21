import { getData } from './api.js';
import { addBigPicture, bigPicture, resetComments} from './big_pictures.js';
const pictureTemplate = document.querySelector('#picture').content;
const newPictureTemplate = pictureTemplate.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const documentFragment = document.createDocumentFragment();
const deleteComments = () => {
  for (let i = 0; document.querySelectorAll('.social__comment').length; i++) {
    document.querySelector('.social__comment').remove();
  }
};

const generateError = (message) => {
  const error = document.querySelector('#error').content.querySelector('section').cloneNode(true);
  error.querySelector('h2').textContent = message;
  document.querySelector('body').append(error);
};

const renderPosts = (posts) => {
  posts.forEach((post) => {
    const clone = newPictureTemplate.cloneNode(true);
    clone.querySelector('.picture__img').src = post.url;
    clone.querySelector('.picture__likes').textContent = post.likes;
    clone.querySelector('.picture__comments').textContent = post.comments.length;
    documentFragment.appendChild(clone);
    clone.addEventListener('click', () => {
      deleteComments();
      addBigPicture(post);
    });
  });
  pictures.appendChild(documentFragment);
};


const closeBigPicture = () => {
  deleteComments();
  bigPicture.classList.add('hidden');
  bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
  bigPicture.querySelector('.comments-loader').classList.remove('hidden');
  document.querySelector('body').classList.remove('modal-open');
  resetComments();
};

bigPicture.querySelector('.big-picture__cancel').addEventListener('click', () => {
  closeBigPicture();
}, { once: true });

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    closeBigPicture();
  }
});

getData(renderPosts, generateError);
