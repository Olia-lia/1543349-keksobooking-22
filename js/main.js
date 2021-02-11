import './data.js';
import {TOTAL_OFFERS, generateRentalOffer} from './data.js';

const createRentalOfferArray = new Array(TOTAL_OFFERS).fill(null).map(() => generateRentalOffer());
createRentalOfferArray;
