function randomInt(from, to) {
  const result = from + Math.random() * (from - to + 1);
  return Math.floor(result);
}

randomInt(0, 100);

function maxStringLength(str, length) {
  return str.length <= length;
}

maxStringLength('13513515353153', 30);

