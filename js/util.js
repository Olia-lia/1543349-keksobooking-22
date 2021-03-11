const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const errorMessage = 'Значения введены неверно!';

  if (min < 0 || max < 0) {
    throw new Error(errorMessage + ' Значения не могут быть отрицательными.');
  }

  if (min >= max) {
    throw new Error(errorMessage + ' Верхнее значение диапазона должно быть больше нижнего.');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, lengthOfTail) => {
  min = Math.floor(min * Math.pow(10, lengthOfTail));
  max = Math.ceil(max * Math.pow(10, lengthOfTail));

  const randomNumber = getRandomInteger(min, max);
  return randomNumber / Math.pow(10, lengthOfTail);
}

const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const getArrayOfRandomLength = (array) => {
  return array.filter(() => Boolean(getRandomInteger(0, 1)));
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

export {getRandomInteger, getRandomFloat, getRandomArrayElement, getArrayOfRandomLength, isEscEvent};
