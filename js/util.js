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

const debounce = (callback, timeoutDelay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};
const getRandomElements = (array, count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    const randomElement = array[getRandomPositiveInteger(0, array.length - 1)];
    result.push(randomElement);
    array.splice(array.indexOf(randomElement), 1);
  }
  return result;
};

export {getRandomPositiveInteger, getRandomElements, debounce};
