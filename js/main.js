import {createRentalOffers} from './data.js';
import {generateCards, renderCard} from './card.js';
import './form.js';

const TOTAL_OFFERS = 10;

const offers = createRentalOffers(TOTAL_OFFERS);

const cardElements = generateCards(offers);

renderCard(cardElements[0]);



