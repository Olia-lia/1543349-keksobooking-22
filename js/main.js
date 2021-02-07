'use strict';

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const errorMessage = 'Значения введены неверно!';

  if (min < 0 || max < 0) {
    throw new Error(errorMessage + ' Значения не могут быть отрицательными.');
  }

  if (min >= max) {
    throw new Error(errorMessage + min + max + ' Верхнее значение диапазона должно быть больше нижнего.' );
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, lengthOfTail) => {
  min = Math.floor(min * Math.pow(10, lengthOfTail));
  max = Math.ceil(max * Math.pow(10, lengthOfTail));

  const randomNumber = getRandomInteger(min, max);
  return randomNumber / Math.pow(10, lengthOfTail);
}

const TITLES = [
  'Просторные апартаменты около парка',
  'Уютная квартира в самом эпицентре ночных развлечений',
  'Славный дом у озера',
  'Квартира с потрясающим видом',
  'Апартаменты в стиле декаданс',
];
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const CHECKS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTION = [
  'Имеется все необходимое для комфортного проживания: холодильник, кухня, зубные щетки бонусом',
  'Чисто, стильно, комфортно. Всегда есть горячая вода',
];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const getArrayOfRandomLength = (array) => {
  return array.filter(() => Boolean(getRandomInteger(0, array.length)));
};

const generateRentalOffer = () => {
  const avatar = 'img/avatars/user' + 0 + getRandomInteger(1, 8) + '.png';
  const title = getRandomArrayElement(TITLES);
  const price = getRandomInteger(0, 1000000);
  const type = getRandomArrayElement(TYPES);
  const rooms = getRandomInteger(0, 100);
  const guests = getRandomInteger(0, 100);
  const checkin = getRandomArrayElement(CHECKS);
  const checkout = getRandomArrayElement(CHECKS);
  const features = getArrayOfRandomLength(FEATURES);
  const description = getRandomArrayElement(DESCRIPTION);
  const photos = getArrayOfRandomLength(PHOTOS);
  const getLocation = ({x, y}) => {
    return (x + ', ' + y);
  };
  const location = {
    x: getRandomFloat(35.65, 35.70, 5),
    y: getRandomFloat(139.70, 139.80, 5),
  };
  const adress = getLocation(location);

  return {
    author: {
      avatar: avatar,
    },
    offer: {
      title: title,
      adress: adress,
      price: price,
      type: type,
      rooms: rooms,
      guests: guests,
      checkin: checkin,
      checkout: checkout,
      features: features,
      description: description,
      photos: photos,
    },
    location: location,
  }
}

const createRentalOfferArray = () => {
  let result = new Array();
  for (let i = 0; i < 10; i++) {
    const rentalOffer = generateRentalOffer(i);
    result.push(rentalOffer);
  }
  return result;
};

createRentalOfferArray();
