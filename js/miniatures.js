import { getData } from './api.js';
import { addBigPicture, bigPicture, resetComments} from './big_pictures.js';
import { getRandomElements, debounce } from './util.js';
const pictureTemplate = document.querySelector('#picture').content;
const newPictureTemplate = pictureTemplate.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const documentFragment = document.createDocumentFragment();
const imgFiltersForm = document.querySelector('.img-filters__form');
const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

let newPosts = [], tempForPosts = [];

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

const renderPosts = () => {
  tempForPosts.forEach((post) => pictures.removeChild(post));
  tempForPosts = [];
  newPosts.forEach((post) => {
    const clone = newPictureTemplate.cloneNode(true);
    clone.querySelector('.picture__img').src = post.url;
    clone.querySelector('.picture__likes').textContent = post.likes;
    clone.querySelector('.picture__comments').textContent = post.comments.length;
    documentFragment.appendChild(clone);
    tempForPosts.push(clone);
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

const changeFilter = (posts, db) => {
  imgFiltersForm.addEventListener('click', (evt) => {
    newPosts = [...posts];
    switch (evt.target.id) {
      case 'filter-default':
        defaultFilter.classList.add('img-filters__button--active');
        randomFilter.classList.remove('img-filters__button--active');
        discussedFilter.classList.remove('img-filters__button--active');
        break;
      case 'filter-random':
        defaultFilter.classList.remove('img-filters__button--active');
        randomFilter.classList.add('img-filters__button--active');
        discussedFilter.classList.remove('img-filters__button--active');
        newPosts = getRandomElements(newPosts, 10);
        break;
      case 'filter-discussed':
        defaultFilter.classList.remove('img-filters__button--active');
        randomFilter.classList.remove('img-filters__button--active');
        discussedFilter.classList.add('img-filters__button--active');
        newPosts.sort((a, b) => b.comments.length - a.comments.length);
        break;
    }
    db();
  });
};

const prerenderPosts = (posts) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  newPosts = [...posts];
  renderPosts();
  changeFilter(posts, debounce(() => renderPosts(), 500));
};

getData(prerenderPosts, generateError);
