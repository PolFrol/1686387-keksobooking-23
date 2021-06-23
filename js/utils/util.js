function generateInteger(min, max) {
  if (max <= min) {
    throw new RangeError('Второе число должно быть больше первого');
  } else {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (min - max + 1)) + max;
  }
}

function generateRandomFloat(min, max, numberPoints) {
  if (max <= min) {
    throw new RangeError('Второе число должно быть больше первого');
  } else {
    return parseFloat((Math.random() * (max - min) + min).toFixed(numberPoints));
  }
}

const getRandomArrayElement = (elements) => elements[generateInteger(0, elements.length - 1)];


const getRandomArray = (array) => {
  const randomArray = [];
  for (let counter = 0; counter < array.length; counter++) {
    if (Math.random() > 0.5) {
      randomArray.push(array[counter]);
    }
  }
  return randomArray;
};

export {generateInteger, generateRandomFloat, getRandomArrayElement, getRandomArray};

