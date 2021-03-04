import {addFormHandlers, addResutButtonHandler} from './form.js';
import {disablePage, activatePage} from './page.js';
import {initializeMap, renderOffersPin, resetMap} from './map.js';
import {getOffers} from './server.js';


const TOTAL_OFFERS = 10;

const resetPage = () => {
  resetMap();
}


disablePage();
initializeMap(activatePage);

getOffers((offers) => {
  renderOffersPin(offers.slice(0, TOTAL_OFFERS))
});


addFormHandlers();

addResutButtonHandler(resetPage);







