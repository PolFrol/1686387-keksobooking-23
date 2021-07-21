import {sendData} from './api.js';
import {CENTRE_TOKYO} from './map.js';
const HOUSE_PRICES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const ESC_KEY_CODE = 27;
const body = document.querySelector('body');
const formAd = document.querySelector('.ad-form');
const resetFormButton = document.querySelector('.ad-form__reset');
const formFieldset = formAd.querySelectorAll('fieldset');
const priceInput = document.querySelector('#price');
const houseSelect = document.querySelector('#type');
const timeInSelect = document.querySelector('#timein');
const timeOutSelect = document.querySelector('#timeout');
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

priceInput.min = HOUSE_PRICES['flat'];
priceInput.placeholder = HOUSE_PRICES['flat'];

const houseChangeHandler = (evt) => {
  priceInput.min = HOUSE_PRICES[evt.target.value];
  priceInput.placeholder = HOUSE_PRICES[evt.target.value];
};

houseSelect.addEventListener('change', houseChangeHandler);

const timeChangeHandler = (linkedItem) => (evt) => {
  linkedItem.value = evt.target.value;
};

timeInSelect.addEventListener('change', timeChangeHandler(timeOutSelect));

timeOutSelect.addEventListener('change', timeChangeHandler(timeInSelect));

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
