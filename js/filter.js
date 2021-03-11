const filter = document.querySelector('.map__filters');
const filterElements = filter.querySelectorAll('.map__filter');
//const typeInputFilter = filter.querySelector('#housing-type');
//const priceInputFilter = filter.querySelector('#housing-price');

//const MIN_LOW_PRICE = 0;
//const MIN_MIDDLE_PRICE = 10000;
//const MIN_MAX_PRICE = 50000;
//Sconst MAX_PRICE = 1000000;

/*const makePriceRange = (start, end) => {
  let range = [];
  for (let i = start; i <= end; i+= 1) {
    range.push(i)
  }
  return range;
})/

/*const FilterPrice = {
  any: makePriceRange(MIN_LOW_PRICE, MAX_PRICE),
  middle: makePriceRange(MIN_MIDDLE_PRICE, (MIN_MAX_PRICE - 1)),
  low: makePriceRange(MIN_LOW_PRICE, (MIN_MIDDLE_PRICE - 1)),
  high: makePriceRange(MIN_MAX_PRICE, MAX_PRICE),
};)*/


const disableFilter = () => {
  filter.classList.add('map__filters--disabled');
  filterElements.forEach((filterElement) => {
    filterElement.setAttribute('disabled', 'disabled');});
}

const activateFilter = () => {
  filter.classList.remove('map__filters--disabled');
  filterElements.forEach((filterElement) => {
    filterElement.removeAttribute('disabled', 'disabled');});
}


/*const onPriceFilterSelect = (offers) => {
  const priceRange = FilterPrice[priceInputFilter.value];
  offers.forEach((offer) => {
    if  (offer.price >= priceRange[0] && offer.price <= priceRange.length-1) {
      return true;
    }
  });
}

const addPriceInputHandler = (offers, cb) => {
  priceInputFilter.addEventListener('change', onPriceFilterSelect);
  cb();
}*/





export {disableFilter, activateFilter}
