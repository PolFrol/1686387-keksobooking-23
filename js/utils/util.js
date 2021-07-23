function generateInteger(min, max) {
  if (max <= min) {
    throw new RangeError('Второе число должно быть больше первого');
  } else {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (min - max + 1)) + max;
  }
}

export {generateInteger};

