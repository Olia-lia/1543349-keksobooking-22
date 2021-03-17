import {addFormHandlers} from './form.js';
import {disablePage, activatePage} from './page.js';
import {initializeMap, renderOffersPin} from './map.js';
import {loadOffers} from './server.js'
import {setOffers} from './data-store.js';
import {addFilterHandlers} from './filter.js';

/* global _:readonly */
const DEBOUNCE_TIME = 1000;

disablePage();
initializeMap(activatePage);

loadOffers((offers) => {
  setOffers(offers);
  renderOffersPin(offers);


  addFilterHandlers(
    _.debounce(renderOffersPin, DEBOUNCE_TIME));
})


addFormHandlers();
