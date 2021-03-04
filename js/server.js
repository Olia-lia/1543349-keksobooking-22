const showRequestError = (message) => {
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = 500;
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = '50%';
  errorContainer.style.transform = 'translate(-50%, -50%)';
  errorContainer.style.top = '250px';
  errorContainer.style.padding = '40px 60px';
  errorContainer.style.fontSize = '40px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.backgroundColor = 'white';
  errorContainer.style.background = 'radial-gradient(circle at center, #ed2939 50px, #ffffff 50px)';
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


const getOffers = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data',
  )

    .then(checkStatus)
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
    .catch((showRequestError) => (showRequestError));
}


const sendForm = (onSuccess, onFail, body) => {
  fetch('https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )

    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};


export {getOffers, sendForm};
