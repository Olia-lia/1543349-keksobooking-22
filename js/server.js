import { renderOffersPin } from './map.js';

const showRequestError = (message) => {
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = 500;
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = '50%';
  errorContainer.style.transform = 'translate(-50%, -50%)';
  errorContainer.style.top = '250px';
  errorContainer.style.padding = '40px 60px';
  errorContainer.style.fontSize = '33px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.backgroundColor = 'white';
  errorContainer.style.background = 'radial-gradient(circle at center, #ed2939 40px, #ffffff 40px)';
  errorContainer.textContent = message;

  document.body.append(errorContainer);
  setTimeout(() => {
    errorContainer.remove();
  }, 5000);
}

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  else {
    const { statusText, status } = response;
    showRequestError(`${status}: ${statusText}`);
  }
}


fetch('https://22.javascript.pages.academy/keksobooking/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)

  .then(checkStatus)
  .then((response) => response.json())
  .then((offers) => {
    renderOffersPin(offers);
  })
  .catch((showRequestError) => (showRequestError));





onst formData = new FormData(document.querySelector('.ad-form'))


fetch('https://22.javascript.pages.academy/keksobooking',
  {
    method: 'POST',
    //lcredentials: 'same-origin',
    body: formData,
  },
)

/*.then((response) => {
  console.log(response.status);
  console.log(response.ok);
  return response.json();
})
.then((json) => {
  console.log('Результат', json);
})
.catch((err) => {
  console.error(err);*/
