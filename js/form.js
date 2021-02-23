const form = document.querySelector('.ad-form');
const formElements = form.querySelectorAll('.ad-form__element');
const typeSelect = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const checkoutSelect = form.querySelector('#timeout');
const checkinSelect = form.querySelector('#timein');

const disableForm = () => {
  form.classList.add('ad-form--disabled');
  formElements.forEach((formElement) => {
    formElement.setAttribute('disabled', 'disabled');});
}

const activateForm = () => {
  form.classList.remove('ad-form--disabled');
  formElements.forEach((formElement) => {
    formElement.removeAttribute('disabled', 'disabled');});
}

const MinPriceNight = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const setPricePlaceholder = () => {
  priceInput.placeholder = MinPriceNight[typeSelect.value];

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
  setPricePlaceholder();
  addPriceListener();
  addCheckTimeHandler();

};


export {disableForm, activateForm, addFormHandlers};
