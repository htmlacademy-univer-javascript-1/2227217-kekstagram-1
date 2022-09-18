function randomInt(from, to) {
  if (from >= 0 && to >= 0) {
    const result = from + Math.random() * (from - to + 1);
    return Math.floor(result);
  } else {
    print('Numbers should be greater or equals 0');
  }
}

randomInt(0, 100);

function maxStringLength(str, length) {
  return str.length <= length;
}

maxStringLength('13513515353153', 30);

