const TYPE_OF_PLACE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const PICTURE_WIDHT = 45;
const PICTURE_HEIGHT = 40;

const renderCard = (ad) => {

  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = TYPE_OF_PLACE[ad.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;

  const featureAd = cardElement.querySelector('.popup__features');
  featureAd.innerHTML = '';
  if (ad.offer.features) {
    ad.offer.features.forEach((feature) => {
      const item = document.createElement('li');
      item.classList.add('popup__feature');
      item.classList.add(`popup__feature--${feature}`);
      featureAd.appendChild(item);
    });
  } else {
    featureAd.classList.add('.visually-hidden');
  }

  if (ad.offer.description) {
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  } else {
    cardElement.querySelector('.popup__description').classList.add('.visually-hidden');
  }

  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  const cardPhotosBlock = cardElement.querySelector('.popup__photos');
  cardPhotosBlock.innerHTML = '';
  if (ad.offer.photos) {
    ad.offer.photos.forEach((photo) => {
      const picture = document.createElement('img');
      picture.classList.add('popup__photo');
      picture.src = photo;
      picture.width = PICTURE_WIDHT;
      picture.height = PICTURE_HEIGHT;
      picture.alt = 'Фотография жилья';
      cardPhotosBlock.appendChild(picture);
    });
  } else {
    cardPhotosBlock.classList.add('.visually-hidden');
  }

  return cardElement;
};

export {renderCard};

