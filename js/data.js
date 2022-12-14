import { getRandomPositiveInteger } from './util.js';

const NAMES = [
  'Гэр',
  'Жаба',
  'Девочка',
  'Ривендер',
  'Ктун'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Хто я',
  'dab',
  'monkaS',
  'xdd',
  'Ладно.'
];

const generatedId = () => {
  getRandomPositiveInteger(0, 10000000);
};

const generatedComments =  (countOfComments) => {
  const comments = [];
  for (let i = 0; i < countOfComments; i++) {
    comments.push(
      {
        id: generatedId(),
        avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
        message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
        name: NAMES[getRandomPositiveInteger(0, NAMES.length - 1)]
      }
    );
  }
  return comments;
};

const generatedPosts = (countOfPosts) => {
  const posts = [];
  for (let i = 1; i <= countOfPosts; i++) {
    posts.push(
      {
        id: generatedId(),
        url: `photos/${i}.jpg`,
        description: DESCRIPTIONS[getRandomPositiveInteger(0, DESCRIPTIONS.length - 1)],
        likes: getRandomPositiveInteger(15, 200),
        comments: generatedComments(getRandomPositiveInteger(1, 25))
      }
    );
  }
  return posts;
};

export{generatedPosts};
