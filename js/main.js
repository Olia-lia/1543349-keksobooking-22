import {createRentalOffers} from './data.js';
import {addFormHandlers} from './form.js';
import './form.js';
import {disablePage, activatePage} from './page.js';
import {initializeMap, renderOffersPin} from './map.js';

disablePage();
initializeMap(activatePage);
addFormHandlers();


const TOTAL_OFFERS = 10;
const offers = createRentalOffers(TOTAL_OFFERS);

renderOffersPin(offers);

