import {createCard} from './card.js';
import {enabledForm} from './form.js';
import {getData} from './api.js';
import {getFiltered, setFilterChange} from './filter.js';
import {debounce} from './utils/debounce.js';

const TIMEOUT_DELAY = 500;
const AD_COUNT = 10;
const SCALE = 10;
const CENTRE_TOKYO = {
  lat: 35.67500,
  lng: 139.75000,
};
const ICON_URL = {
  MAIN_ICON: 'img/main-pin.svg',
  AD_ICON: 'img/pin.svg',
};

const addressInput = document.querySelector('#address');
const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const createMarker = (ad) => {
  const {lat, lng} = ad.location;
  const pinIcon = L.icon({
    iconUrl: ICON_URL.AD_ICON,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const markerAd = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: pinIcon,
    },
    {
      keepInView: true,
    },

  );
  markerAd
    .addTo(markerGroup)
    .bindPopup(
      createCard(ad),
    );
};

const createMarkerGroup = (ads) => {
  markerGroup.clearLayers();
  ads.slice(0, AD_COUNT).forEach((ad) => {
    createMarker(ad);
  });
};

const mainPinIcon = L.icon({
  iconUrl: ICON_URL.MAIN_ICON,
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarkerAd = L.marker(
  {
    lat: CENTRE_TOKYO.lat,
    lng: CENTRE_TOKYO.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const onMapLoad = () => {
  enabledForm();
  getData(
    (similarAds) => {
      createMarkerGroup(similarAds);
      setFilterChange(debounce(() => createMarkerGroup(getFiltered(similarAds)), TIMEOUT_DELAY));
    },
    () => {
      const errorBlock = document.querySelector('.load-error');
      errorBlock.classList.remove('hidden');

      setTimeout(() => {
        errorBlock.classList.add('hidden');
      }, 3000);
    },
  );
};

map.on('load', () => {
  onMapLoad();
})
  .setView({
    lat: CENTRE_TOKYO.lat,
    lng: CENTRE_TOKYO.lng,
  }, SCALE);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


mainMarkerAd.addTo(map);

const setAddress = (evt, LATITUDE = CENTRE_TOKYO.lat, LONGITUDE = CENTRE_TOKYO.lng) => {
  addressInput.value = `${Number(LATITUDE).toFixed(5)}, ${Number(LONGITUDE).toFixed(5)}`;
};

setAddress();

mainMarkerAd.on('moveend', (evt) => {
  setAddress(evt, evt.target.getLatLng().lat, evt.target.getLatLng().lng);
});

const restoreParameters = () => {
  markerGroup.clearLayers();
  mainMarkerAd.setLatLng({
    lat: CENTRE_TOKYO.lat,
    lng: CENTRE_TOKYO.lng,
  });

  map.setView({
    lat: CENTRE_TOKYO.lat,
    lng: CENTRE_TOKYO.lng,
  }, SCALE);

  setAddress(CENTRE_TOKYO);

  getData((similarAds) => createMarkerGroup(similarAds.slice(0, AD_COUNT)));
};

export {createMarkerGroup, restoreParameters, AD_COUNT, CENTRE_TOKYO, addressInput};
