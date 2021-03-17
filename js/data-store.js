import {getOffers} from './server.js';
import {renderOffersPin} from './map.js';


const setOffers = (cb) => {

  getOffers((offers) => {
    renderOffersPin(offers);
    if (cb) {
      cb(offers)
    }
  })
}



export {setOffers}
