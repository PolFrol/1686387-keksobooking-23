// Источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function generateInteger(min, max) {
  if (max <= min) {
    throw new RangeError('Второе число должно быть больше первого');
  } else {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (min - max + 1)) + max;
  }
}

function generateRandomFloat(min, max, numberPoints) {
  if (max <= min) {
    throw new RangeError('Второе число должно быть больше первого');
  } else {
    return parseFloat((Math.random() * (max - min) + min).toFixed(numberPoints));
  }
}

const MIN_LAT = 35.65;
const MAX_LAT = 35.7;
const MIN_LNG = 139.7;
const MAX_LNG = 139.8;

const TITLE = [
  'Милая, уютная квартирка в центре Токио',
  'Недорогой вариант для молодой семейной пары',
  'Просторная светлая студия рядом с метро',
  'Шикарные апартаменты в спальном районе',
  'Большая квартира с панорамными окнами',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECHOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
  'Просторные комнаты с новым ремонтом и мебелью, можно жить с животными',
  'Развита инфрастуктура, рядом много кафе и магазинов',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomArrayElement = (elements) => elements[generateInteger(0, elements.length - 1)];

const SIMILAR_AD_COUNT = 10;

function createAd () {
  const randomLat = generateRandomFloat(MIN_LAT, MAX_LAT, 5);
  const randomLng = generateRandomFloat(MIN_LNG, MAX_LNG, 5);

  return {
    author: {
      avatar: 'img/avatars/user(03).png',
    },
    offer: {
      title: getRandomArrayElement(TITLE),
      address: {
        randomLat,
        randomLng,
      },
      price: generateInteger(0, 1000000),
      type: getRandomArrayElement(TYPE),
      rooms: generateInteger(0, 100),
      guests: generateInteger(0, 100),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECHOUT),
      features: getRandomArrayElement(FEATURES),
      description: getRandomArrayElement(DESCRIPTION),
      photos: getRandomArrayElement(PHOTOS),
    },
    location: {
      randomLat,
      randomLng,
    },
  };
}

const simalarAds = new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());
