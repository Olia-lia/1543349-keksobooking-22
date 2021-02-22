const form = document.querySelector('.ad-form');
const typeSelect = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const checkoutSelect = form.querySelector('#timeout');
const checkinSelect = form.querySelector('#timein');


const MinPriceNight = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

const onPriceInputSelect = () => {
  const minPrice = MinPriceNight[typeSelect.value];
  priceInput.min = minPrice;
  priceInput.placeholder = minPrice;
}

const addPriceListener = () => {
  priceInput.setAttribute('min', MinPriceNight[typeSelect.value]);

  typeSelect.addEventListener('change', onPriceInputSelect);
};

const addCheckTimeHandler = () => {

  checkoutSelect.addEventListener('change', () => {
    checkinSelect.value = checkoutSelect.value;
  });

  checkinSelect.addEventListener('change', () => {
    checkoutSelect.value = checkinSelect.value;
  });
};

const addFormHandlers = () => {
  addPriceListener();
  addCheckTimeHandler();
}

export {addFormHandlers};
