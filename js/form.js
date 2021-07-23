import {sendData} from './api.js';
import {CENTRE_TOKYO} from './map.js';

const ESC_KEY_CODE = 27;
const body = document.querySelector('body');
const formAd = document.querySelector('.ad-form');
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


const formReset = (form) => {
  form.reset();
  form.querySelector('#address').value = `${CENTRE_TOKYO.lat}, ${CENTRE_TOKYO.lng}`;
};

resetFormButton.addEventListener('click', (resetEvent) => {
  resetEvent.preventDefault();
  formReset(formAd);
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
      formReset(evt.target);
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
