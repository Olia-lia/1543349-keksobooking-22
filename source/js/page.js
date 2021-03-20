import {disableFilter, activateFilter} from  './filter.js';
import {disableForm, activateForm} from './form.js';
import {resetMap, renderOffersPin} from './map.js';
import {resetForm} from './form.js';
import {resetFilter} from './filter.js';
import {getOffers} from './data-store.js';



const disablePage = () => {
  disableFilter();
  disableForm();
}

const activatePage = () => {
  activateForm();
  activateFilter();
}

const resetPage = () => {
  resetForm();
  resetMap();
  resetFilter();
  renderOffersPin(getOffers());
}

export {disablePage, activatePage, resetPage};
