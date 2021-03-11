import {addFormHandlers, addResutButtonHandler, setSelectedCapacityValue} from './form.js';
import {disablePage, activatePage} from './page.js';
import {initializeMap, renderOffersPin, resetMap} from './map.js';
import {getOffers} from './server.js';


const resetPage = () => {
  resetMap();
  setSelectedCapacityValue();
}


disablePage();
initializeMap(activatePage);

getOffers((offers) => {
  renderOffersPin(offers);
});


addFormHandlers();

addResutButtonHandler(resetPage);







