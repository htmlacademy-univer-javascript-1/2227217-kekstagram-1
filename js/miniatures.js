import { generatedPosts } from './data.js';

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
});
pictures.appendChild(documentFragment);
