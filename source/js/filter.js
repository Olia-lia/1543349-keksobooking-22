import {getOffers} from './data-store.js';

const filter = document.querySelector('.map__filters');
const filterElements = filter.querySelectorAll('.map__filter');
const typeFilterSelect = filter.querySelector('#housing-type');
const priceFilterSelect = filter.querySelector('#housing-price');
const guestsFilterSelect = filter.querySelector('#housing-guests');
const roomsFilterSelect = filter.querySelector('#housing-rooms');

const MIN_LOW_PRICE = 0;
const MIN_MIDDLE_PRICE = 10000;
const MIN_MAX_PRICE = 50000;
const MAX_PRICE = Infinity;

const FilterPrice = {
  any: {
    min: MIN_LOW_PRICE,
    max: MAX_PRICE,
  },
  middle: {
    min: MIN_MIDDLE_PRICE,
    max: MIN_MAX_PRICE - 1,
  },
  low: {
    min: MIN_LOW_PRICE,
    max: MIN_MIDDLE_PRICE - 1,
  },
  high: {
    min: MIN_MAX_PRICE,
    max: MAX_PRICE,
  },
};

const FILTER_DEFAULT = 'any';


const disableFilter = () => {
  filter.classList.add('map__filters--disabled');
  filterElements.forEach((filterElement) => {
    filterElement.setAttribute('disabled', 'disabled');
  });
}

const activateFilter = () => {
  filter.classList.remove('map__filters--disabled');
  filterElements.forEach((filterElement) => {
    filterElement.removeAttribute('disabled', 'disabled');
  });
}

const checkOfferType= (type) => {
  const selectedType = typeFilterSelect.value;

  return selectedType === FILTER_DEFAULT ||
  selectedType === type;
}

const checkOfferPrice = (price) => {
  const selectedPrice = priceFilterSelect.value;
  const priceRange = FilterPrice[priceFilterSelect.value];
  const {min, max} = priceRange;

  return selectedPrice === FILTER_DEFAULT ||
  (price >= min && price <= max);
}


const checkOfferFeatures  = (features) => {
  const checkedFeatures = [...filter.querySelectorAll('.map__checkbox' && 'input:checked')].map(checkbox => checkbox.value);
  return checkedFeatures.every((feature => features.includes(feature)));
}

const checkOffersRooms = (rooms) => {
  const selectedRooms = roomsFilterSelect.value;

  return rooms.toString() === selectedRooms || selectedRooms === FILTER_DEFAULT;
}

const checkOfferGuests = (guests) => {
  const selectedGuests = guestsFilterSelect.value;
  return selectedGuests === FILTER_DEFAULT || selectedGuests === guests.toString();
}

const checkOffer = (offer) => {

  const {
    type,
    price,
    rooms,
    features,
    guests,
  } = offer.offer;

  return checkOfferType(type) && checkOfferPrice(price) && checkOfferFeatures(features) && checkOffersRooms(rooms) && checkOfferGuests(guests)
}


const filterOffers = (offers) => {
  const filteredOffers = offers.filter(checkOffer);
  return filteredOffers;
}

const addFilterHandlers = (cb) => {
  const onFilterChange = () => {
    const filteredOffers = filterOffers(getOffers());
    cb(filteredOffers)
  }

  filter.addEventListener('change', onFilterChange);
}

const resetFilter = () => {
  filter.reset();
}

export {disableFilter, activateFilter, addFilterHandlers, filterOffers, resetFilter}
