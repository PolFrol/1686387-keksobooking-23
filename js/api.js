import { clearForm } from './form.js';

const ADDRESS_GET = 'https://23.javascript.pages.academy/keksobooking/data';
const ADDRESS_POST = 'https://23.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => {
  fetch(ADDRESS_GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((ads) => {
      onSuccess(ads);
    })
    .catch((error) => {
      onError(`При загрузке данных произошла ошибка: "${error}"`);
    });
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
        clearForm();
      } else {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    })
    .catch((error) => {
      onError(error);
    });
};

export {getData, sendData};
