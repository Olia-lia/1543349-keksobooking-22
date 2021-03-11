const SHOW_REQUEST_TIME = 5000;

const MessageTypes = {
  succes: 'success',
  error: 'error',
}

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

  document.body.appendChild(errorContainer);
  setTimeout(() => {
    errorContainer.remove();
  }, SHOW_REQUEST_TIME);
}

const showMessage = (messageType) => {
  const resultTemplate = document.querySelector(`#${messageType}`)
    .content.querySelector(`.${messageType}`)
    .cloneNode(true);

  resultTemplate.classList.add('submit-message');

  const fragment = document.createDocumentFragment();
  fragment.append(resultTemplate);
  document.body.appendChild(fragment);
}

const showSuccess = () => showMessage(MessageTypes.succes);
const showError = () => showMessage(MessageTypes.error);



export {showRequestError, showMessage, showSuccess, showError}
