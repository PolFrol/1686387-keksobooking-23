import {sendData} from './api.js';
import {restoreParameters} from './map.js';
import {previewAvatar, previewPhoto} from './avatar.js';

const PREVIEW_AVATAR_DEFAULT = 'img/muffin-grey.svg';
const PREVIEW_PHOTO_DEFAULT = 'img/muffin-white.svg';

const ESC_KEY_CODE = 27;
const body = document.querySelector('body');
const formAd = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const resetFormButton = document.querySelector('.ad-form__reset');
const formFieldset = formAd.querySelectorAll('fieldset');
const errorSubmitMessage = document.querySelector('#error').content;
const successSubmitMessage = document.querySelector('#success').content;

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

  sendData(
    () => {
      const onEscPress = (escapeEvt) => {
        if (escapeEvt.keyCode === ESC_KEY_CODE) {
          body.removeChild(document.querySelector('.success'));
          body.removeEventListener('keydown', onEscPress);
        }
      };

      body.appendChild(successSubmitMessage);
      body.addEventListener('keydown', onEscPress);
      clearForm(evt.target);
    },
    () => {
      const onEscPress = (escapeEvt) => {
        if (escapeEvt.keyCode === ESC_KEY_CODE) {
          body.removeChild(document.querySelector('.error'));
          body.removeEventListener('keydown', onEscPress);
        }
      };

      const onClick = (clickEvent) => {
        if (clickEvent.target.classList.contains('error__button') || clickEvent.target.classList.contains('error')) {
          body.removeChild(document.querySelector('.error'));
          body.removeEventListener('keydown', onClick);
        }
      };

      body.appendChild(errorSubmitMessage);
      body.addEventListener('keydown', onEscPress);
      body.addEventListener('click', onClick);
    },
    new FormData(evt.target),
  );
});


export {disabledForm, enabledForm};
