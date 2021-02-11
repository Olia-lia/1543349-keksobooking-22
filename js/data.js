import {getRandomInteger, getRandomFloat, getRandomArrayElement, getArrayOfRandomLength} from './util.js';

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
const MIN_AVATAR_COUNT = 1;
const MAX_AVATAR_COUNT = 8;
const MIN_PRICE = 0;
const MAX_PRICE = 1000000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 100;
const MIN_GUESTS = 1;
const MAX_GUESTS = 100;
const MIN_LATITUDE = 35.65;
const MAX_LATITUDE = 35.70;
const MIN_LONGITUDE = 139.7;
const MAX_LONGITUDE = 139.8;
const TOTAL_OFFERS = 10;

const generateRentalOffer = () => {
  const avatar = `img/avatars/user0${getRandomInteger(MIN_AVATAR_COUNT, MAX_AVATAR_COUNT)}.png`;
  const title = getRandomArrayElement(TITLES);
  const price = getRandomInteger(MIN_PRICE, MAX_PRICE);
  const type = getRandomArrayElement(TYPES);
  const rooms = getRandomInteger(MIN_ROOMS, MAX_ROOMS);
  const guests = getRandomInteger(MIN_GUESTS, MAX_GUESTS);
  const checkTime = getRandomArrayElement(CHECKS);
  const features = getArrayOfRandomLength(FEATURES);
  const description = getRandomArrayElement(DESCRIPTION);
  const photos = getArrayOfRandomLength(PHOTOS);
  const location = {
    x: getRandomFloat(MIN_LATITUDE, MAX_LATITUDE, 5),
    y: getRandomFloat(MIN_LONGITUDE, MAX_LONGITUDE, 5),
  };
  const adress = `${location.x}, ${location.y}`;

  return {
    author: {
      avatar,
    },
    offer: {
      title,
      adress,
      price,
      type,
      rooms,
      guests,
      checkin: checkTime,
      checkout: checkTime,
      features,
      description,
      photos,
    },
    location,
  }
}

/*const createRentalOfferArray = (TOTAL_OFFERS) => {
  const result = [];
  for (let i = 0; i < TOTAL_OFFERS; i++) {
    const rentalOffer = generateRentalOffer(i);
    result.push(rentalOffer);
  }
  return result;
};*/

export {generateRentalOffer, TOTAL_OFFERS};
