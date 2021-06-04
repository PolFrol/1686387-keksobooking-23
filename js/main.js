// Источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function generateInteger(min, max) {
  if (max <= min) {
    return ('Второе число должно быть больше первого')
  }

  else (min > 0); {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (min - max + 1)) + max;
  }
}

generateInteger(1, 10)

function generateRandomFloat(min, max, n) {
  if (max <= min) {
    return ('Второе число должно быть больше первого')
  }

  else (min >= 0); {
  return (Math.random() * (max - min) + min).toFixed(n);
  }
}
generateRandomFloat(1.2, 1.9, 2)
