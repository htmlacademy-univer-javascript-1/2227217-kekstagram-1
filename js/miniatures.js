import { generatedPosts } from './data.js';
import { addBigPicture, bigPicture } from './big_pictures.js';
const pictureTemplate = document.querySelector('#picture').content;
const newPictureTemplate = pictureTemplate.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const documentFragment = document.createDocumentFragment();

const posts = generatedPosts(25);

posts.forEach((post) => {
  const clone = newPictureTemplate.cloneNode(true);
  clone.querySelector('.picture__img').src = post.url;
  clone.querySelector('.picture__likes').textContent = post.likes;
  clone.querySelector('.picture__comments').textContent = post.comments.length;
  documentFragment.appendChild(clone);
  clone.addEventListener('click', () => {
    addBigPicture(post);
  });
});

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
  bigPicture.querySelector('.comments-loader').classList.remove('hidden');
  document.querySelector('body').classList.remove('modal-open');
  bigPicture.querySelector('.social__comments').replaceChildren();
};

bigPicture.querySelector('.big-picture__cancel').addEventListener('click', () => {
  closeBigPicture();
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    closeBigPicture();
  }
});


pictures.appendChild(documentFragment);
