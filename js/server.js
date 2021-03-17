import {showRequestError, showError, showSuccess} from './messages.js';

const BASE_URL = 'https://22.javascript.pages.academy/keksobooking';

const checkStatusRequest = (response) => {
  if (response.ok) {
    return response;
  }

  const { statusText, status } = response;
  const error = new Error (`${status} (${statusText})`);
  return error;
}

const getOffers = (onSuccess) => {
  fetch(`${BASE_URL}/data`)

    .then(checkStatusRequest)
    .then((response) => response.json())

    .then((offers) => {
      onSuccess(offers);
    })

    .catch((error) => showRequestError(error));
}


const sendForm = (body) => {
  fetch(BASE_URL,
    {
      method: 'POST',
      body,
    },
  )

    .then(checkStatusRequest)
    .then((response) => showSuccess(response))
    .catch((error) => showError(error));

};


export {getOffers, sendForm};
