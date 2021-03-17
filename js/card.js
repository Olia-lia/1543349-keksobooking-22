const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const getType = (type) => {
  switch (type) {
    case 'palace':
      return 'Дворец'
    case 'bungalow':
      return 'Бунгало';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    default: 'Любой тип жилья ';
  }
};

const fillFeaturesList = (featuresList, features) => {
  featuresList.innerHTML = '';
  const fragment = document.createDocumentFragment();

  features.forEach((feature) => {
    const newItem = document.createElement('li');
    newItem.classList.add('popup__feature', `popup__feature--${feature}`);
    fragment.append(newItem);
  });

  featuresList.append(fragment);
};

const fillPhotosList = (photosList, photos) => {

  photosList.innerHTML = '';
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoTemplate = cardTemplate.querySelector('.popup__photo').cloneNode(true);
    photoTemplate.src = photo;
    fragment.append(photoTemplate);
  });
  photosList.append(fragment);
};


const generateCard = (rentalOffer) => {
  const newCard = cardTemplate.cloneNode(true);

  const {avatar} = rentalOffer.author;
  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    features,
    checkin,
    checkout,
    description,
    photos,
  } = rentalOffer.offer;

  const avatarElement = newCard.querySelector('.popup__avatar');
  avatar ? avatarElement.src = avatar : newCard.removeChild(avatarElement);

  const titleElement = newCard.querySelector('.popup__title');
  title ? titleElement.textContent = title : newCard.removeChild(titleElement);

  const addressElement = newCard.querySelector('.popup__text--address');
  address ? addressElement.textContent = address : newCard.removeChild(addressElement);

  const priceElement = newCard.querySelector('.popup__text--price');
  price ? priceElement.textContent = `${price} ₽/ночь` : newCard.removeChild(priceElement);

  const typeElement = newCard.querySelector('.popup__type');
  type ? typeElement.textContent = getType(type) : newCard.removeChild(typeElement);

  const capacityElement = newCard.querySelector('.popup__text--capacity');
  rooms && guests ? capacityElement.textContent = `${rooms} комнаты для ${guests} гостей` : newCard.removeChild(capacityElement);

  const timeElement = newCard.querySelector('.popup__text--time');
  timeElement.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;

  const featuresList = newCard.querySelector('.popup__features');
  features.length > 0 ? fillFeaturesList(featuresList, features) : newCard.removeChild(featuresList);

  const descriptionElement = newCard.querySelector('.popup__description');
  description ? descriptionElement.textContent = description : newCard.removeChild(descriptionElement);

  const photosList = newCard.querySelector('.popup__photos');
  photos.length > 0 ? fillPhotosList(photosList, photos) : newCard.removeChild(photosList);

  return newCard;

};

const generateCards = (offers) =>  {
  const cardElements = offers.map((rentalOffer) => {
    return generateCard(rentalOffer);
  });
  return cardElements;
};

const map = document.querySelector('.map__canvas');

const renderCard = (cardElement) => {
  map.appendChild(cardElement);
};

export {generateCards, renderCard, generateCard};
