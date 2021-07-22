const ROOMS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const HOUSE_PRICES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const roomsNumber = document.querySelector('#room_number');
const capacityItem = document.querySelector('#capacity');
const guestsNumber = capacityItem.querySelectorAll('option');
const priceInput = document.querySelector('#price');
const houseSelect = document.querySelector('#type');
const timeInSelect = document.querySelector('#timein');
const timeOutSelect = document.querySelector('#timeout');

const validateRooms = () => {
  const roomValue = roomsNumber.value;

  guestsNumber.forEach((guest) => {
    const isDisabled = (ROOMS[roomValue].indexOf(guest.value) === -1);
    guest.selected = ROOMS[roomValue][0] === guest.value;
    guest.disabled = isDisabled;
  });
};

const onRoomNumberChange = () => {
  validateRooms();
};


roomsNumber.addEventListener('change', onRoomNumberChange);

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
