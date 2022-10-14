function getRandomPositiveInteger(from, to) {
  if (from >= 0 && to >= 0) {
    const result = from + Math.random() * (from - to + 1);
    return Math.floor(result);
  } else {
    throw new Error('Numbers should be greater or equals 0');
  }
}
getRandomPositiveInteger(1, 2);

function checkStringLength(str, length) {
  return str.length <= length;
}

checkStringLength('13513515353153', 30);

export {getRandomPositiveInteger};