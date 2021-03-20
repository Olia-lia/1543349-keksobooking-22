import {addFormHandlers, addResutButtonHandler, addSubmitHandler} from './form.js';
import {disablePage, activatePage} from './page.js';
import {initializeMap, renderOffersPin} from './map.js';
import {loadOffers} from './server.js';
import {showSuccess} from './messages.js';
import {setOffers} from './data-store.js';
import {resetPage} from './page.js';
import {addFilterHandlers} from './filter.js';
import {debounce} from 'lodash';

const DEBOUNCE_TIME = 1000;

disablePage();
initializeMap(activatePage);

loadOffers((offers) => {
  setOffers(offers);
  renderOffersPin(offers);


  addFilterHandlers(
    debounce(renderOffersPin, DEBOUNCE_TIME));
})

addFormHandlers();
addResutButtonHandler(resetPage);
addSubmitHandler(() => {showSuccess();
  resetPage()});
