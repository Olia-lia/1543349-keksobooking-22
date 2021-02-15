import {createRentalOffers} from './data.js';

const TOTAL_OFFERS = 10;

const templateFragment = document.querySelector('#card').content;
const article = templateFragment.querySelector('.popup');

const similarFragment = document.createDocumentFragment()
const similarRentalOffer = createRentalOffers(TOTAL_OFFERS);

const getType = (type) => {
  switch (type) {
    case 'palace':
      return 'Дворец';
    case 'bungalow':
      return 'Бунгало';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
  }
}

similarRentalOffer.forEach((rentalOffer) => {
  const newCard = article.cloneNode(true);
  const popup = newCard.children;
  popup[0].src = rentalOffer.author.avatar;
  popup[1].textContent = rentalOffer.offer.title;
  popup[2].textContent = rentalOffer.offer.address;
  popup[3].textContent = `${rentalOffer.offer.price} ₽/ночь`;
  popup[4].textContent = getType(rentalOffer.offer.type);
  popup[5].textContent = `${rentalOffer.offer.rooms} комнаты для ${rentalOffer.offer.guests} гостей`;
  popup[6].textContent = `Заезд после ${rentalOffer.offer.checkin}, выезд до ${rentalOffer.offer.checkout}`;

  const featuresItems = popup[7].querySelectorAll('.popup__feature');
  featuresItems.forEach((featuresItem) => {
    let shouldKeepItem = rentalOffer.offer.features.some((feature) => {
      return featuresItem.classList.contains(`popup__feature--${feature}`);
    });
    if (!shouldKeepItem) {
      popup[7].removeChild(featuresItem);
    }
    if (rentalOffer.offer.features === null){
      popup[7].classList.add('hidden');
    }
  });

  popup[8].textContent = rentalOffer.offer.description;

  const photosItems = popup[9];
  popup[9].innerHTML = '';
  const photosData = rentalOffer.offer.photos;

  photosData.map((photoDatum) => {
    const photosItem = document.createElement('img');
    photosItem.classList.add('popup__photo');
    photosItem.src = photoDatum;
    photosItem.width = 45;
    photosItem.height = 40;
    photosItem.alt = 'Фотография жилья';

    if (photosData === null){
      popup[9].classList.add('hidden');
    }

    return photosItems.append(photosItem);
  });
  return similarFragment.append(newCard);
});


const map = document.querySelector('.map__canvas');

const renderingSimilarOffer = map.appendChild(similarFragment.children[3]);

export {renderingSimilarOffer};


