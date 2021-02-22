import {createRentalOffers} from './data.js';
//import {generateCard} from './card.js';
import {addFormHandlers} from './form.js';
import {unloadedPage} from './page.js';
import './map.js';
import {addMapHandlers, map, renderOffersPin} from './map.js';

unloadedPage();
addMapHandlers();
addFormHandlers();

map.setView({
  lat: 35.68950,
  lng: 139.69171,
}, 10);

const TOTAL_OFFERS = 10;
const offers = createRentalOffers(TOTAL_OFFERS);
renderOffersPin(offers);

