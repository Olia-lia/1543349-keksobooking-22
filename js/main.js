import {addFormHandlers} from './form.js';
import {disablePage, activatePage} from './page.js';
import {initializeMap, renderOffersPin} from './map.js';
import {setOffers} from './data-store.js';
import {addFilterHandlers} from './filter.js';

/* global _:readonly */
const RENDER_DELAY = 1000;

disablePage();
initializeMap(activatePage);

setOffers((offers) =>

  addFilterHandlers(
    _.debounce(renderOffersPin, RENDER_DELAY),
    offers,
  ));

addFormHandlers();

