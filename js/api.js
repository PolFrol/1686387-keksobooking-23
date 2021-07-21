const getData = (onSuccess, onError) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => onError());
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
