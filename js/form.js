import {sendData} from './api.js';
import {restoreParameters} from './map.js';
import {showMessageSendSuccess, showMessageSendError} from './messages.js';
import {previewAvatar, previewPhoto} from './avatar.js';

const PREVIEW_AVATAR_DEFAULT = 'img/muffin-grey.svg';
const PREVIEW_PHOTO_DEFAULT = 'img/muffin-white.svg';

const formAd = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const resetFormButton = document.querySelector('.ad-form__reset');
const formFieldset = formAd.querySelectorAll('fieldset');

const disabledForm = () => {
  formAd.classList.add('ad-form--disabled');

  formFieldset.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const enabledForm = () => {
  formAd.classList.remove('ad-form--disabled');
  formFieldset.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

const clearForm = () => {
  formAd.reset();
  mapFilter.reset();
  restoreParameters();
  previewAvatar.src = PREVIEW_AVATAR_DEFAULT;
  previewPhoto.src = PREVIEW_PHOTO_DEFAULT;
};

resetFormButton.addEventListener('click', (resetEvent) => {
  resetEvent.preventDefault();
  clearForm();
});

formAd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(
    showMessageSendSuccess,
    showMessageSendError,
    formData,
  );
});


export {disabledForm, enabledForm, clearForm};
