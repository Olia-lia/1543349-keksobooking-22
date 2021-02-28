import {addFormHandlers} from './form.js';
import {disablePage, activatePage} from './page.js';
import {initializeMap, renderOffersPin} from './map.js';
import './server.js';

disablePage();
initializeMap(activatePage);
addFormHandlers();


//const TOTAL_OFFERS = 10;
//const offers = createRentalOffers(TOTAL_OFFERS);



//renderOffersPin(offers);

