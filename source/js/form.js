import {sendForm} from './server.js';

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
const avatarField = form.querySelector('.ad-form-header__input');
const avatarPreviewContainer = form.querySelector('.ad-form-header__preview');
const avatarPreview = avatarPreviewContainer.querySelector('img');
const housingPhotoField = form.querySelector('.ad-form__input');
const housingPhotoPreview = form.querySelector('.ad-form__photo');


const avatarPreviewDefault = avatarPreview.src;
const ROOMS_EXCEPTION = '100';
const CAPACITY_EXCEPTION = '0';
const MIN_TITLE_LENGTH = 30;
const MAX_PRICE = 1000000;

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const MinPriceNight = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};


const disableForm = () => {
  form.classList.add('ad-form--disabled');
  formElements.forEach((formElement) => {
    formElement.disabled === 'true';
  });
};

const activateForm = () => {
  form.classList.remove('ad-form--disabled');
  formElements.forEach((formElement) => {
    formElement.disabled === 'false';
  });
}

const checkTitleValidity = () => {
  const valueLength = titleInput.value.length;
  titleInput.setCustomValidity(valueLength < MIN_TITLE_LENGTH) ?
    titleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} символов`):

    titleInput.setCustomValidity('');
  titleInput.reportValidity();
};

const addTitleHandler = () => {
  titleInput.addEventListener('input', checkTitleValidity);
};

const setAddress = (lat, lng) => {
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

const checkPriceValidity = () => {
  const validity = priceInput.value > MAX_PRICE ?
    priceInput.setCustomValidity(`Цена не должна превышать ${MAX_PRICE}`):
    priceInput.setCustomValidity('');
  priceInput.reportValidity(validity);
};


const addPriceInputHandler = () => {
  priceInput.min = MinPriceNight[typeSelect.value];
  typeSelect.addEventListener('change', onPriceInputSelect);
  priceInput.addEventListener('input', checkPriceValidity);
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

const onRoomsInputSelect = () => {

  if (roomsInput.value === ROOMS_EXCEPTION && capacityInput.value !== CAPACITY_EXCEPTION) {
    capacityInput.setCustomValidity('Выбранное количество комнат не для проживания гостей');
  }

  else if (capacityInput.value === CAPACITY_EXCEPTION && roomsInput.value !== ROOMS_EXCEPTION) {
    roomsInput.setCustomValidity('100 комнат');
  }

  else if (roomsInput.value < capacityInput.value) {
    capacityInput.setCustomValidity('Количество гостей не может превышать количество комнат');
  }

  else {capacityInput.setCustomValidity('');
    roomsInput.setCustomValidity('');
  }

  capacityInput.reportValidity();
  roomsInput.reportValidity();
}


const addRoomsInputHandler = () => {
  roomsInput.addEventListener('change', onRoomsInputSelect);
};

const addCapacityInputHandler = () => {
  capacityInput.addEventListener('change', onRoomsInputSelect);
};

const addRoomsInputHandlers = () => {
  addRoomsInputHandler();
  addCapacityInputHandler();
};


const uploadImage = (evt, cb) => {

  const photo = evt.files[0];
  const fileName = photo.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', cb)
    reader.readAsDataURL(photo);
  }
};

const onHousingPhotosChange = (evt) => {
  let preview = housingPhotoPreview.querySelector('img');
  if (preview === null) {
    preview = document.createElement('img');

    housingPhotoPreview.style.display = 'flex';
    housingPhotoPreview.style.alignItems = 'center';
    housingPhotoPreview.style.justifyContent = 'center';
    preview.style.maxWidth = '100%';

    housingPhotoPreview.append(preview);
  }
  preview.src = evt.target.result;
}

const onAvatarChange = (evt) => {
  const preview = avatarPreviewContainer.querySelector('img');
  preview.src = evt.target.result;
}

const uploadImageAvatar = () => {
  uploadImage(avatarField, onAvatarChange);
};

const uploadHousingPhoto = () => {
  uploadImage(housingPhotoField, onHousingPhotosChange);
};

const addUploadImagesHandlers = () => {
  avatarField.addEventListener('change', uploadImageAvatar);
  housingPhotoField.addEventListener('change', uploadHousingPhoto);
}

const resetPreviews = () => {
  avatarPreview.src = avatarPreviewDefault;

  if (housingPhotoPreview.querySelector('img')) {
    housingPhotoPreview.querySelector('img').remove();
  }

}

const resetForm = () => {
  form.reset();
  resetPreviews();
  setSelectedCapacityValue();
}


const addSubmitHandler = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (form.reportValidity()) {
      sendForm(new FormData(form), onSuccess)
    }
  });
}

const addResutButtonHandler = (cb) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cb();
  });
}

const addFormHandlers = () => {

  setPricePlaceholder();
  setSelectedCapacityValue()
  addPriceInputHandler();
  addCheckTimeHandler();
  addTitleHandler();
  addRoomsInputHandlers();
  addUploadImagesHandlers();
};

export {disableForm, activateForm, addFormHandlers, setAddress, resetForm, addResutButtonHandler, addSubmitHandler};
