const filter = document.querySelector('.map__filters');
const filterElements = filter.querySelectorAll('.map__filter');

const disableFilter = () => {
  filter.classList.add('map__filters--disabled');
  filterElements.forEach((filterElement) => {
    filterElement.setAttribute('disabled', 'disabled');});
}

const activateFilter = () => {
  filter.classList.remove('map__filters--disabled');
  filterElements.forEach((filterElement) => {
    filterElement.removeAttribute('disabled', 'disabled');});
}

export {disableFilter, activateFilter}
