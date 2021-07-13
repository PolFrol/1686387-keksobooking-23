const TYPE_OF_PLACE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const PICTURE_WIDHT = 45;
const PICTURE_HEIGHT = 40;

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const createCardElement = cardTemplate.cloneNode(true);

const renderCard = (ad) => {

  if (ad.offer.title) {
    createCardElement.querySelector('.popup__title').textContent= ad.offer.title;
  } else {
    createCardElement.querySelector('.popup__title').classList.add('hidden');
  }

  if (ad.offer.address) {
    createCardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  } else {
    createCardElement.querySelector('.popup__text--address').classList.add('hidden');
  }

  if (`${ad.offer.price}`) {
    createCardElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  } else {
    createCardElement.querySelector('.popup__text--price').classList.add('hidden');
  }

  if (ad.offer.type) {
    createCardElement.querySelector('.popup__type').textContent = TYPE_OF_PLACE[ad.offer.type];
  } else {
    createCardElement.querySelector('.popup__type').classList.add('hidden');
  }

  if (`${ad.offer.rooms}`) {
    createCardElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  } else {
    createCardElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  if (`${ad.offer.checkin}`) {
    createCardElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  } else {
    createCardElement.querySelector('.popup__text--time').classList.add('hidden');
  }

  const featureAd = createCardElement.querySelector('.popup__features');
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
    createCardElement.querySelector('.popup__description').textContent = ad.offer.description;
  } else {
    createCardElement.querySelector('.popup__description').classList.add('hidden');
  }

  if (ad.author.avatar) {
    createCardElement.querySelector('.popup__avatar').src = ad.author.avatar;
  } else {
    createCardElement.querySelector('.popup__avatar').classList.add('hidden');
  }

  const createPhoto = (photos) => {
    const photosFragment = document.createDocumentFragment();
    photos.forEach((photo) => {
      const picture = document.createElement('img');
      picture.classList.add('popup__photo');
      picture.src = photo;
      picture.width = PICTURE_WIDHT;
      picture.height = PICTURE_HEIGHT;
      picture.alt = 'Фотография жилья';
      photosFragment.appendChild(picture);
    });
    return photosFragment;
  };

  const photosBlock = createCardElement.querySelector('.popup__photos');
  photosBlock.innerHTML = '';

  if (ad.offer.photos) {
    photosBlock.appendChild(createPhoto(ad.offer.photos));
  } else {
    photosBlock.classList.add('hidden');
  }

  return createCardElement;

};

export {renderCard};

