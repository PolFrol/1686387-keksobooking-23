const HOUSE_PRICES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const formAd = document.querySelector('.ad-form');
const formFieldset = formAd.querySelectorAll('fieldset');
const priceInput = document.querySelector('#price');
const houseSelect = document.querySelector('#type');
const timeInSelect = document.querySelector('#timein');
const timeOutSelect = document.querySelector('#timeout');

const disabledForm = () => {
  const isDisabled = formAd.classList.toggle('ad-form--disabled');
  formFieldset.forEach((fieldset) => {
    fieldset.disabled = isDisabled;
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

export {disabledForm};
