import {getRandomFloat} from './util.js';
import {loadedPage} from './page.js';
import {generateCard} from './card.js';

/* global L:readonly */

const form = document.querySelector('.ad-form');
const addressInput = form.querySelector('#address');

const map = L.map('map-canvas');

const addMapHandlers = () => {
  map.on('load', loadedPage);
}

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize:     [50, 50],
  iconAnchor:   [16,37],
  shadowAnchor: [16, 37],
});

const mainIconMarker = L.marker([35.6859, 139.692],
  {
    draggable: true,
    icon: mainIcon,
  });

mainIconMarker.addTo(map);


mainIconMarker.on('moveend', (evt) => {
  addressInput.setAttribute('readonly', 'readonly');
  const {lat, lng} = evt.target.getLatLng();
  addressInput.value = `${getRandomFloat(lat ,lat,5)}, ${getRandomFloat(lng, lng, 5)}`;
});


const renderOffersPin = (offers) => {
  offers.forEach((offer) => {
    const icon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor:  [0, -30],
    });

    const marker = L.marker(
      {
        lat: offer.location.x,
        lng: offer.location.y,
      },
      {
        icon,
      },
    );
    marker.addTo(map)
      .bindPopup(generateCard(offer));
  });
}


export {map, mainIconMarker, addMapHandlers, renderOffersPin};
