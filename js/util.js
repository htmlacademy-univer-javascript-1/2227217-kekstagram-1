const getRandomPositiveInteger = (from, to) => {
  if (from >= 0 && to >= 0) {
    from = Math.ceil(from);
    to = Math.floor(to);
    return Math.floor(Math.random() * (to - from + 1)) + from;
  } else {
    throw new Error('Numbers should be greater or equals 0');
  }
};
getRandomPositiveInteger(1, 2);

const checkStringLength = (str, length) => str.length <= length;

checkStringLength('13513515353153', 30);

export {getRandomPositiveInteger};
