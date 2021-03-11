import {showRequestError, showError, showSuccess} from './messages.js';
const requestLink = 'https://22.javascript.pages.academy/keksobooking/data';
const submitLink = 'https://22.javascript.pages.academy/keksobooking';

const checkStatusRequest = (response) => {
  if (response.ok) {
    return response;
  }

  else {
    const { statusText, status } = response;
    showRequestError(`${status}: ${statusText}`);
  }
}


const getOffers = (onSuccess) => {
  fetch(requestLink,
  )

    .then(checkStatusRequest)
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
    .catch((showRequestError) => (showRequestError));
}

const checkStatusSubmit = (response) => {
  if (response.ok) {
    showSuccess();
  }

  else {
    showError();
  }
}


const sendForm = (body, onSuccess) => {
  fetch(submitLink,
    {
      method: 'POST',
      body,
    },
  )

    .then(checkStatusSubmit)
    .then((result) => {onSuccess(result);
    })
    .catch((showError) => {
      showError();
    })
};


export {getOffers, sendForm};
