import {AD_COUNT} from './map.js';

const PRICES_VALUE = {
  low: 'low',
  middle: 'middle',
  high: 'high',
};

const PRICES_RANGE = {
  low: 10000,
  high: 50000,
};

const SPECIAL_VALUE = 'any';

const mapFilter = document.querySelector('.map__filters');
const housingType = mapFilter.querySelector('#housing-type');
const housingPrice = mapFilter.querySelector('#housing-price');
const housingRooms = mapFilter.querySelector('#housing-rooms');
const housingGuests = mapFilter.querySelector('#housing-guests');
const housingFeatures = mapFilter.querySelectorAll('.map__checkbox');

const filterTypes = (ad) => housingType.value === SPECIAL_VALUE || ad.offer.type === housingType.value;

const filterPrices = (ad) => {
  switch(housingPrice.value) {
    case PRICES_VALUE.middle:
      return ad.offer.price >= PRICES_RANGE.low && ad.offer.price <= PRICES_RANGE.high;
    case PRICES_VALUE.low:
      return ad.offer.price <= PRICES_RANGE.low;
    case PRICES_VALUE.high:
      return ad.offer.price >= PRICES_RANGE.high;
  }
  return true;
};

const filterRooms = (ad) => housingRooms.value === SPECIAL_VALUE || ad.offer.rooms === Number(housingRooms.value);

const filterGuests = (ad) => housingGuests.value === SPECIAL_VALUE || ad.offer.guests === Number(housingGuests.value);

const filterFeatures = (ad) => Array.from(housingFeatures).every((checkbox) => {
  if (!checkbox.checked) {
    return true;
  }
  if (!ad.offer.features) {
    return false;
  }
  return ad.offer.features.includes(checkbox.value);
});

const filterAd = (ad) =>
  filterTypes(ad) &&
  filterPrices(ad) &&
  filterRooms(ad) &&
  filterGuests(ad) &&
  filterFeatures(ad);

const getFiltered = (ads) => {
  const filtered = [];
  for (let index = 0; index < ads.length; index++) {
    const ad = ads[index];

    const isFiltered = filterAd(ad);
    if (isFiltered) {
      filtered.push(ad);
      if (filtered.length === AD_COUNT) {
        break;
      }
    }
  }
  return filtered;
};

const setFilterChange = (cb) => {
  mapFilter.addEventListener('change', cb);
};

export {getFiltered, setFilterChange};
