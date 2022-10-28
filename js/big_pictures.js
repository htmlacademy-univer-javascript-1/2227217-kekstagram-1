const bigPicture = document.querySelector('.big-picture');

const addBigPicture = (post) => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = post.url;
  bigPicture.querySelector('.likes-count').textContent = post.likes;
  bigPicture.querySelector('.comments-count').textContent = post.comments.length;
  for (let i = 0; i < post.comments.length; i++) {

    const comment = document.createElement('li');
    comment.classList.add('social__comment');

    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = post.comments[i].avatar;
    img.alt = post.comments[i].name;
    img.width = '35';
    img.height = '35';

    const p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = post.comments[i].message;

    comment.appendChild(img);
    comment.appendChild(p);
    bigPicture.querySelector('.social__comments').appendChild(comment);
  }
  bigPicture.querySelector('.social__caption').textContent = post.description;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
};

export {addBigPicture, bigPicture};
