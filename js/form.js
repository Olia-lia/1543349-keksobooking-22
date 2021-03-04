import {sendForm} from './server.js';
import {resetMap} from './map.js';

const form = document.querySelector('.ad-form');
const formElements = form.querySelectorAll('.ad-form__element');
const typeSelect = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const checkoutSelect = form.querySelector('#timeout');
const checkinSelect = form.querySelector('#timein');
const titleInput = form.querySelector('#title');
const addressInput = form.querySelector('#address');
const roomsInput = form.querySelector('#room_number');
const capacityInput = form.querySelector('#capacity');
const resetButton = form.querySelector('.ad-form__reset');

const ROOMS_EXCEPTION = 100;
const MIN_TITLE_LENGTH = 30;

const MinPriceNight = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const disableForm = () => {
  form.classList.add('ad-form--disabled');
  formElements.forEach((formElement) => {
    formElement.setAttribute('disabled', 'disabled');
  });
};

const activateForm = () => {
  form.classList.remove('ad-form--disabled');
  formElements.forEach((formElement) => {
    formElement.removeAttribute('disabled', 'disabled');
  });
}

const checkTitleValidity = () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) +' символов');
  }
  else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
};

const addTitleHandler = () => {
  titleInput.addEventListener('input', checkTitleValidity);
};

const getAddress = (lat, lng) => {
  addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}


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



const setSelectedCapacityValue = () => {
  capacityInput.value = roomsInput.value;

};

const onRoomsInputselect = () => {
  const maxCapacityValue = roomsInput.value;
  capacityInput.value = maxCapacityValue;
  for (let i = 0; i < capacityInput.children.length; i++) {
    capacityInput.children[i].setAttribute('disabled', 'disabled');

    if (maxCapacityValue == ROOMS_EXCEPTION) {
      capacityInput.children[capacityInput.children.length -1].disabled = false;
    }

    else if (capacityInput.children[i].value <= maxCapacityValue && capacityInput.children[i].value != 0) {
      capacityInput.children[i].disabled = false;
    }
  }
}

const addRoomsInputHandler = () => {
  roomsInput.addEventListener('change', onRoomsInputselect);
};

const removeRoomsInputHandler = () => {
  for (let i = 0; i < capacityInput.children.length; i++) {
    capacityInput.children[i].disabled = false;
  }
};

const addCapacityInputHandlers = () => {
  capacityInput.addEventListener('blur', removeRoomsInputHandler);

  capacityInput.addEventListener('change', () => {
    if (capacityInput.value > roomsInput.value) {
      roomsInput.setCustomValidity('Количество гостей не может превышать количество комнат');
    }
    roomsInput.reportValidity();
  });
};

const onRoomsInputRemoveEvent = () => {
  roomsInput.addEventListener('onchange', removeRoomsInputHandler)
}

const addRoomsInputHandlers = () => {
  addRoomsInputHandler();
  addCapacityInputHandlers();
  onRoomsInputRemoveEvent();
};


const createSubmitResult = (element) => {
  const resultTemplate = document.querySelector(`#${element}`)
    .content.querySelector(`.${element}`)
    .cloneNode(true);

  resultTemplate.classList.add('submit-message');

  const fragment = document.createDocumentFragment();
  fragment.append(resultTemplate);
  form.append(fragment);
}

const onResultEscKeydown = (evt) => {
  if (evt.key === ('Escape' || 'Esc')) {
    evt.preventDefault();
    closeSubmitResult();
  }
};


const showSubmitResult = (element) => {
  createSubmitResult(element);

  const errorButton = document.querySelector('.error__button');

  document.addEventListener('keydown', onResultEscKeydown);
  document.addEventListener('click', closeSubmitResult);


  if (element === 'error') {
    errorButton.addEventListener('click', closeSubmitResult);
  }
};

const closeSubmitResult = () => {

  const resultItem = form.querySelector('.submit-message');
  if (resultItem.classList.contains('success')) {
    form.reset();
    resetMap();
  }

  form.removeChild(resultItem);

  document.removeEventListener('keydown', onResultEscKeydown);
  document.removeEventListener('click', closeSubmitResult);
}

const addSubmitHandler = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendForm(
      () => showSubmitResult('success'),
      () => showSubmitResult('error'),
      new FormData(form),
    );
  });
}

const addResutButtonHandler = (callback) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    form.reset();
    callback();
  });
}


const addFormHandlers = () => {

  setPricePlaceholder();
  setSelectedCapacityValue()
  addPriceListener();
  addCheckTimeHandler();
  addTitleHandler();
  addRoomsInputHandlers();
  addSubmitHandler();
};

export {disableForm, activateForm, addFormHandlers, getAddress, addSubmitHandler, addResutButtonHandler};
