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

const filterTypes = (ad) => {
  housingType.value === ad.offer.type || SPECIAL_VALUE === housingType.value;
};

const filterPrices = (ad) => {
  housingPrice.value === PRICES_VALUE.middle && (ad.offer.price < PRICES_RANGE.low || ad.offer.price > PRICES_RANGE.high);
};

const filterRooms = (ad) => {
  housingRooms.value === ad.offer.rooms || SPECIAL_VALUE === Number(housingRooms.value);
};

const filterGuests = (ad) => {
  housingGuests.value === ad.offer.rooms || SPECIAL_VALUE === Number(housingGuests.value);
};

const filterFeatures = (ad) => Array.from(housingFeatures)
  .every((checkbox) => {
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
  mapFilter.addEventListener('change', () => {
    cb();
  });
};

export {getFiltered, setFilterChange};
