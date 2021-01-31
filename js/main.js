'use strict'

//Функция, возвращающая случайное число

const getRandom = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min < 0 || max < 0 && min < 0 && max < 0) {
    alert('Значения не могут быть отрицательными! Введите то же самое, только без минуса');
    return undefined;
  }

  if (min >= max) {
    alert('Верхнее значение диапазона должно быть больше нижнего!');
    return undefined;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandom(100, 500);

//Функция, возвращающая случайное число с плавающей точкой

const getRandomFloat = function (min, max, lengthOfTail) {
  if (min < 0 || max < 0 && min < 0 && max < 0) {
    alert('Аттеншн! Значения не могут быть отрицательными');
    return undefined;
  }

  if (min >= max) {
    alert('Аттеншн! Верхнее значение диапазона должно быть больше нижнего!');
    return undefined;
  }

  min = Math.ceil(min * Math.pow(10, lengthOfTail));
  max = Math.round(max * Math.pow(10, lengthOfTail));

  const RandomNumber =  Math.floor(Math.random() * (max - min + 1)) + min;
  return RandomNumber / Math.pow(10, lengthOfTail);
}

getRandomFloat();
