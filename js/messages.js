import {isEscEvent, isMouseLeftEvent} from './util.js';

const SHOW_REQUEST_TIME = 10000;

const MessageTypes = {
  success: 'success',
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
  errorContainer.style.fontSize = '30px';
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
    .content
    .querySelector(`.${messageType}`)
    .cloneNode(true);

  resultTemplate.style.zIndex = 500;

  const fragment = document.createDocumentFragment();
  fragment.append(resultTemplate);

  const closeButton = resultTemplate.querySelector('.error__button')

  const removeTemplate = () => {
    resultTemplate.remove();

    if (closeButton) {
      closeButton.removeEventListener('click', onButtonCloseClick);
    }

    document.removeEventListener('keydown', onDocumentEscapePressed);
    document.removeEventListener('click', onMouseLeftClick);
  }


  const onButtonCloseClick = (evt) => {
    if (isMouseLeftEvent(evt)) {
      removeTemplate();
    }
  }

  const onDocumentEscapePressed = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      removeTemplate();
    }
  };

  const onMouseLeftClick = (evt) => {
    if (isMouseLeftEvent(evt)) {
      evt.preventDefault();
      removeTemplate();
    }
  }

  document.body.querySelector('main').appendChild(fragment);
  document.addEventListener('keydown', onDocumentEscapePressed);
  document.addEventListener('click', onMouseLeftClick);

  if (closeButton) {
    closeButton.addEventListener('click', onButtonCloseClick);
  }

}

const showSuccess = () => showMessage(MessageTypes.success);
const showError = (message) => showMessage(MessageTypes.error, message);




export {showRequestError, showSuccess, showError}
