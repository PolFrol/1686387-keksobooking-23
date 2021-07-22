const ADDRESS_GET = 'https://23.javascript.pages.academy/keksobooking/data';
const ADDRESS_POST = 'https://23.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => {
  fetch(ADDRESS_GET)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => onError());
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    ADDRESS_POST,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    })
    .catch((error) => {
      onError(error);
    });
};

export {getData, sendData};
