const form = document.querySelector('.ad-form');
const formElements = form.querySelectorAll('.ad-form__element');
const filter = document.querySelector('.map__filters');
const filterElements = filter.querySelectorAll('.map__filter');

const unloadedPage = () => {
  form.classList.add('ad-form--disabled');
  [...formElements].forEach((formElement) => {
    formElement.setAttribute('disabled', 'disabled');});
  filter.classList.add('map__filters--disabled');
  [...filterElements].forEach((filterElement) => {
    filterElement.setAttribute('disabled', 'disabled');});
}

const loadedPage = () => {
  form.classList.remove('ad-form--disabled');
  [...formElements].forEach((formElement) => {
    formElement.removeAttribute('disabled', 'disabled');});
  filter.classList.remove('map__filters--disabled');
  [...filterElements].forEach((filterElement) => {
    filterElement.removeAttribute('disabled', 'disabled');});

}


export {unloadedPage, loadedPage};
