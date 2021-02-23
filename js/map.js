import {getRandomFloat} from './util.js';
import {activatePage} from './page.js';
import {generateCard} from './card.js';
/* global L:readonly */

const form = document.querySelector('.ad-form');
const addressInput = form.querySelector('#address');

const INITIAL_MAP_OPTIONS = {
  lat: 35.68950,
  lng: 139.69171,
};
const ZOOM_MAP = 10;
const INITIAL_MAIN_PIN_POSITION = {
  lat: 35.6859,
  lng: 139.692,
};

const MAIN_PIN_OPTIONS = {
  iconUrl: './img/main-pin.svg',
  iconSize:     [50, 50],
  iconAnchor:   [25,50],
  shadowAnchor: [16, 37],
};

const PIN_OPTIONS = {
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor:  [0, -30],
};

const map = L.map('map-canvas');

const addMapHandlers = () => {
  map.on('load', activatePage);
}

const initializeMap = () => {
  addMapHandlers();

  map.setView(INITIAL_MAP_OPTIONS, ZOOM_MAP);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
}

const mainIcon = L.icon(MAIN_PIN_OPTIONS);

const mainIconMarker = L.marker(
  INITIAL_MAIN_PIN_POSITION,
  {
    draggable: true,
    icon: mainIcon,
  });

mainIconMarker.addTo(map);

const onMarkerMove = (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  addressInput.value = `${getRandomFloat(lat ,lat, 5)}, ${getRandomFloat(lng, lng, 5)}`;
};

const addMarkerMouseHandler = () => {
  mainIconMarker.on('mousemove', onMarkerMove);
};

const addMarkerMoveendHandler = () => {
  mainIconMarker.on('moveend', onMarkerMove);
};

const addMarkerMoveHandlers = () => {
  addMarkerMouseHandler();
  addMarkerMoveendHandler();
}

const renderOffersPin = (offers) => {
  offers.forEach((offer) => {
    const icon = L.icon(PIN_OPTIONS);

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


export {map, addMarkerMoveHandlers, initializeMap, renderOffersPin};
