const TYPE_OF_PLACE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const WIDHT_PICTURE_PLACE = 45;
const HEIGHT_PICTURE_PLACE = 40;
const ALT_PICTURE_PLACE = 'Фотография жилья';

const createCard = (ad) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = cardTemplate.cloneNode(true);

  if (ad.offer.title) {
    cardElement.querySelector('.popup__title').textContent= ad.offer.title;
  } else {
    cardElement.querySelector('.popup__title').classList.add('hidden');
  }

  if (ad.offer.address) {
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  } else {
    cardElement.querySelector('.popup__text--address').classList.add('hidden');
  }

  if (Number.isFinite(ad.offer.price)) {
    cardElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  } else {
    cardElement.querySelector('.popup__text--price').classList.add('hidden');
  }

  if (ad.offer.type) {
    cardElement.querySelector('.popup__type').textContent = TYPE_OF_PLACE[ad.offer.type];
  } else {
    cardElement.querySelector('.popup__type').classList.add('hidden');
  }

  if (Number.isFinite(ad.offer.rooms) && Number.isFinite(ad.offer.guests)) {
    cardElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  } else {
    cardElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  if (ad.offer.checkin && ad.offer.checkout) {
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  } else {
    cardElement.querySelector('.popup__text--time').classList.add('hidden');
  }

  const featureAd = cardElement.querySelector('.popup__features');
  featureAd.innerHTML = '';
  if (ad.offer.features && ad.offer.features.length) {
    ad.offer.features.forEach((feature) => {
      const item = document.createElement('li');
      item.classList.add('popup__feature');
      item.classList.add(`popup__feature--${feature}`);
      featureAd.appendChild(item);
    });
  } else {
    featureAd.classList.add('.hidden');
  }

  if (ad.offer.description) {
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  } else {
    cardElement.querySelector('.popup__description').classList.add('hidden');
  }

  if (ad.author.avatar) {
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
  } else {
    cardElement.querySelector('.popup__avatar').classList.add('hidden');
  }

  const createPhotos = (photos) => {
    const photosFragment = document.createDocumentFragment();
    photos.forEach((photo) => {
      const picture = document.createElement('img');
      picture.classList.add('popup__photo');
      picture.src = photo;
      picture.width = WIDHT_PICTURE_PLACE;
      picture.height = HEIGHT_PICTURE_PLACE;
      picture.alt = ALT_PICTURE_PLACE;
      photosFragment.appendChild(picture);
    });
    return photosFragment;
  };

  const photosBlock = cardElement.querySelector('.popup__photos');
  photosBlock.innerHTML = '';

  if (ad.offer.photos && ad.offer.photos.length) {
    photosBlock.appendChild(createPhotos(ad.offer.photos));
  } else {
    photosBlock.classList.add('hidden');
  }

  return cardElement;

};

export {createCard};

