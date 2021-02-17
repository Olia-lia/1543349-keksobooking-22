
const form = document.querySelector('.ad-form');
const typeSelect = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const checkoutSelect = form.querySelector('#timeout');
const checkinSelect = form.querySelector('#timein');

const minPriceNight = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

const onPriceInputSelect = () => {
  priceInput.setAttribute('min', priceInput.placeholder);

  typeSelect.addEventListener('change', () => {
    priceInput.min = minPriceNight[typeSelect.value];
    priceInput.placeholder = priceInput.min;
  });
}

onPriceInputSelect();

checkoutSelect.addEventListener('input', () => {
  checkinSelect.value = checkoutSelect.value;
});

checkinSelect.addEventListener('input', () => {
  checkoutSelect.value = checkinSelect.value;
});
