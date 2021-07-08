import {similarAds} from './data.js';

const TYPE_OF_PLACE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const cardTemplate = document.querySelector('#card').content;
const similarListElement = cardTemplate.querySelector('.popup');
const similarCard = similarAds;


const similarListFragment = document.createDocumentFragment();

similarCard.forEach((element) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = element.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = element.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = TYPE_OF_PLACE[element.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  cardElement.querySelector('.popup__features').innerHTML = element.offer.features;
  cardElement.querySelector('.popup__description').textContent = element.offer.description;
  cardElement.querySelector('.popup__avatar').src = element.author.avatar;
  cardElement.querySelector('.popup__photos').textContent = element.offer.photos;
  similarListFragment.appendChild(cardElement);

});
similarListElement.appendChild(similarListFragment);

const map = document.querySelector('#map-canvas').appendChild(similarListElement);
map;
