const getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInteger(1, 9);

const getRandomLocation = function (min, max, numbersAfterPoint = 6) {
  return +(Math.random() * (max - min) + min).toFixed(numbersAfterPoint);
};

getRandomLocation(0, 7, 5);
