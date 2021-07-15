const TYPE_OF_PLACE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const PICTURE_WIDHT = 45;
const PICTURE_HEIGHT = 40;
const PICTURE_ALT = 'Фотография жилья';

const createCard = (ad) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const сardElement = cardTemplate.cloneNode(true);

  if (ad.offer.title) {
    сardElement.querySelector('.popup__title').textContent= ad.offer.title;
  } else {
    сardElement.querySelector('.popup__title').classList.add('hidden');
  }

  if (ad.offer.address) {
    сardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  } else {
    сardElement.querySelector('.popup__text--address').classList.add('hidden');
  }

  if (Number.isFinite(ad.offer.price)) {
    сardElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  } else {
    сardElement.querySelector('.popup__text--price').classList.add('hidden');
  }

  if (ad.offer.type) {
    сardElement.querySelector('.popup__type').textContent = TYPE_OF_PLACE[ad.offer.type];
  } else {
    сardElement.querySelector('.popup__type').classList.add('hidden');
  }

  if (Number.isFinite(ad.offer.rooms && ad.offer.guests)) {
    сardElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  } else {
    сardElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  if (ad.offer.checkin && ad.offer.checkout) {
    сardElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  } else {
    сardElement.querySelector('.popup__text--time').classList.add('hidden');
  }

  const featureAd = сardElement.querySelector('.popup__features');
  featureAd.innerHTML = '';
  if (ad.offer.features) {
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
    сardElement.querySelector('.popup__description').textContent = ad.offer.description;
  } else {
    сardElement.querySelector('.popup__description').classList.add('hidden');
  }

  if (ad.author.avatar) {
    сardElement.querySelector('.popup__avatar').src = ad.author.avatar;
  } else {
    сardElement.querySelector('.popup__avatar').classList.add('hidden');
  }

  const createPhotos = (photos) => {
    const photosFragment = document.createDocumentFragment();
    photos.forEach((photo) => {
      const picture = document.createElement('img');
      picture.classList.add('popup__photo');
      picture.src = photo;
      picture.width = PICTURE_WIDHT;
      picture.height = PICTURE_HEIGHT;
      picture.alt = PICTURE_ALT;
      photosFragment.appendChild(picture);
    });
    return photosFragment;
  };

  const photosBlock = сardElement.querySelector('.popup__photos');
  photosBlock.innerHTML = '';

  if (ad.offer.photos) {
    photosBlock.appendChild(createPhotos(ad.offer.photos));
  } else {
    photosBlock.classList.add('hidden');
  }

  return сardElement;

};

export {createCard};

