const bigPicture = document.querySelector('.big-picture');
const commLoader = bigPicture.querySelector('.comments-loader');
let postCommentsCounter = 0;
let loadedCommentsCounter = 0;
let postComments = 0;

const genFiveComments = (comments) => {
  for (let i = 0; i < comments.length; i++) {
    loadedCommentsCounter++;
    const comment = document.createElement('li');
    comment.classList.add('social__comment');

    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comments[i].avatar;
    img.alt = comments[i].name;
    img.width = '35';
    img.height = '35';

    const p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = comments[i].message;

    comment.appendChild(img);
    comment.appendChild(p);
    bigPicture.querySelector('.social__comments').appendChild(comment);
    if (loadedCommentsCounter === postCommentsCounter) {
      commLoader.classList.add('hidden');
    }
  }
};

const slicePost = (comments) => {
  genFiveComments(comments.slice(loadedCommentsCounter, loadedCommentsCounter + 5));
  document.querySelector('.current-comments-count').textContent = loadedCommentsCounter;
};

const addBigPicture = (post) => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = post.url;
  bigPicture.querySelector('.likes-count').textContent = post.likes;
  postComments = post.comments;
  bigPicture.querySelector('.comments-count').textContent = postComments.length;
  postCommentsCounter = postComments.length;
  slicePost(postComments);
  commLoader.addEventListener('click', loadFiveCmts);
  bigPicture.querySelector('.social__caption').textContent = post.description;
  document.querySelector('body').classList.add('modal-open');
};

function loadFiveCmts(evt) {
  evt.preventDefault();
  slicePost(postComments);
}

function resetComments() {
  loadedCommentsCounter = 0;
  postCommentsCounter = 0;
}

export {addBigPicture, bigPicture, resetComments};
