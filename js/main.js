'use strict';

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const errorMessage = 'Значения введены неверно!';

  if (min < 0 || max < 0) {
    throw new Error(errorMessage + ' Значения не могут быть отрицательными.');
  }

  if (min >= max) {
    throw new Error(errorMessage + ' Верхнее значение диапазона должно быть больше нижнего.' );
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const getRandomFloat = (min, max, lengthOfTail) => {
  getRandomInteger(min, max);

  min = Math.ceil(min * Math.pow(10, lengthOfTail));
  max = Math.round(max * Math.pow(10, lengthOfTail));

  const randomNumber = getRandomInteger(min, max);
  return randomNumber / Math.pow(10, lengthOfTail);
}

getRandomFloat();
