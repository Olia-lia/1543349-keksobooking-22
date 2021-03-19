import {showRequestError, showError, showSuccess} from './messages.js';

const BASE_URL = 'https://22.javascript.pages.academy/keksobooking';

const checkStatusRequest = (response) => {
  if (response.ok) {
    return response;
  }

  const { statusText, status } = response;
  const error = new Error (`${status} (${statusText})`);
  throw error;
}

const loadOffers = (onSuccess) => {
  fetch(`${BASE_URL}/data`)

    .then(checkStatusRequest)
    .then((response) => response.json())

    .then((offers) => {
      onSuccess(offers);
    })

    .catch((error) => showRequestError(error));
}


const sendForm = (body, onSuccess) => {
  fetch(BASE_URL,
    {
      method: 'POST',
      body,
    },
  )

    .then(checkStatusRequest)
    .then((response) => {showSuccess(response);
      onSuccess()})
    .catch((error) => showError(error))
};


export {loadOffers, sendForm};
