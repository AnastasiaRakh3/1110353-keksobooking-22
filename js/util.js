'use strict';
export {getRandomInteger, getRandomLocation, getRandomElement, getRandomArray};

const getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomLocation = function (min, max, numbersAfterPoint = 5) {
  return +(Math.random() * (max - min) + min).toFixed(numbersAfterPoint);
};

const getRandomElement = function (elements) {
  const elementIndex = getRandomInteger(0, elements.length - 1);
  return elements[elementIndex];
};

const shuffle = function (elements) {
  for (let i = elements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = elements[i];
    elements[i] = elements[j];
    elements[j] = temp;
  }
  return elements;
};

const getRandomArray = function (elements) {
  shuffle(elements);
  return elements.slice(0, getRandomInteger(1, elements.length));
};
