const getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInteger(1, 9);

const getRandomLocation = function (min, max, numbersAfterPoint = 5) {
  return +(Math.random() * (max - min) + min).toFixed(numbersAfterPoint);
};

getRandomLocation(0, 7, 5);

const getRandomAvatar = getRandomInteger (1, 8);
const types = ["palace", "flat", "house", "bungalow"];
const times = ["12:00", "13:00", "14:00"];
const features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

const getRandomElement = function (elements) {
  const elementIndex = Math.floor(Math.random() * elements.length);
  return elements[elementIndex];
};

const getRandomArray = function (elements) {
  let randomArray = [];
  for (let i = 0; i < elements.length; i++) {
    const newElement = getRandomElement();
    if (randomArray.some((value) => {return value !== newElement;})) {
    randomArray.push(newElement);
  } else if (i===0) {
    randomArray.push(newElement);
  }
  return randomArray;
};

const createAdvertising = function () {
  return {
    author: {
      avatar: 'img/avatars/user' + 0 + getRandomAvatar + '.png',
    },
    offer: {
      title: 'Лучшее предложение',
      address: "" + location(x) + location(y),
      price: getRandomInteger(0, 10000),
      type: getRandomElement(types),
      guests: getRandomInteger(0, 5),
      checkin: getRandomElement(times),
      checkout: getRandomElement(times),
      features: getRandomArray(features),
      description: "Номер класса люкс с видом на море",
      photos: getRandomArray(photos),
    },
    location: {
      x: getRandomLocation(35.65000, 35.70000),
      y: getRandomLocation(139.70000, 139.80000),
    },
  }
};

createAdvertising();
