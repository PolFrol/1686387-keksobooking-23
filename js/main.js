// Источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function generateInteger(min, max) {
  if (max <= min) {
    throw new RangeError('Второе число должно быть больше первого');
  } else {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (min - max + 1)) + max;
  }
}

generateInteger(1, 10);

function generateRandomFloat(min, max, numberPoints) {
  if (max <= min) {
    throw new RangeError('Второе число должно быть больше первого');
  } else {
    return parseFloat((Math.random() * (max - min) + min).toFixed(numberPoints));
  }
}

generateRandomFloat(1.2, 1.9, 2);
