const ROOMS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const roomsNumber = document.querySelector('#room_number');
const capacityItem = document.querySelector('#capacity');
const guestsNumber = capacityItem.querySelectorAll('option');

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
