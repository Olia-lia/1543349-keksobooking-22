import {createRentalOffers} from './data.js';
import {addFormHandlers} from './form.js';
import {disablePage} from './page.js';
import {addMarkerMoveHandlers, initializeMap, renderOffersPin} from './map.js';

disablePage();
initializeMap();
addFormHandlers();



addMarkerMoveHandlers();

const TOTAL_OFFERS = 10;
const offers = createRentalOffers(TOTAL_OFFERS);

renderOffersPin(offers);

