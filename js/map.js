import {generateCard} from './card.js';
import {setAddress} from './form.js';

/* global L:readonly */

const TOTAL_OFFERS = 10;

const INITIAL_MAP_OPTIONS = {
  lat: 35.68950,
  lng: 139.69171,
};
const ZOOM_MAP = 10;
const INITIAL_MAIN_PIN_POSITION = {
  lat: 35.68591,
  lng: 139.69212,
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

const mainIcon = L.icon(MAIN_PIN_OPTIONS);

const mainIconMarker = L.marker(
  INITIAL_MAIN_PIN_POSITION,
  {
    draggable: true,
    icon: mainIcon,
  });


const onMarkerMove = (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  setAddress(lat, lng);
};

const initializeMap = (activateCallBack) => {

  map.on('load', ()  => {
    activateCallBack();
  });

  map.setView(INITIAL_MAP_OPTIONS, ZOOM_MAP);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);


  mainIconMarker.addTo(map);
  mainIconMarker.on('drag', onMarkerMove);
  mainIconMarker.on('moveend', onMarkerMove);

  const {lat, lng} = INITIAL_MAIN_PIN_POSITION;
  setAddress (lat, lng);
};


const renderOffersPin = (offers) => {
  offers.slice()

    .slice(0, TOTAL_OFFERS)

    .forEach((offer) => {
      const icon = L.icon(PIN_OPTIONS);

      const marker = L.marker(
        {
          lat: offer.location.lat,
          lng: offer.location.lng,
        },
        {
          icon,
        },
      );
      marker.addTo(map)
        .bindPopup(generateCard(offer));
    });
}

const resetMap = () => {
  mainIconMarker.setLatLng(INITIAL_MAIN_PIN_POSITION);
  initializeMap();
}


export {initializeMap, renderOffersPin, resetMap};
