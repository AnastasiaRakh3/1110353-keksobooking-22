'use strict';

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomLocation = (min, max, numbersAfterPoint = 5) => {
  return +(Math.random() * (max - min) + min).toFixed(numbersAfterPoint);
};

const getRandomElement = (elements) => {
  const elementIndex = getRandomInteger(0, elements.length - 1);
  return elements[elementIndex];
};

const shuffle = (elements) => {
  for (let i = elements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = elements[i];
    elements[i] = elements[j];
    elements[j] = temp;
  }
  return elements;
};

const getRandomArray = (elements) => {
  shuffle(elements);
  return elements.slice(0, getRandomInteger(1, elements.length));
};

export {
  getRandomInteger,
  getRandomLocation,
  getRandomElement,
  getRandomArray
};
