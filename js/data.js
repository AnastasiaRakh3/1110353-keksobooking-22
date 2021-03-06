'use strict';
import {getRandomInteger, getRandomLocation, getRandomElement, getRandomArray} from './util.js';

const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const ADS_COUNT = 10;

const createAdvertising = function () {
  const x = getRandomLocation(35.65, 35.7);
  const y = getRandomLocation(139.7, 139.8);
  return {
    author: {
      avatar: 'img/avatars/user' + 0 + getRandomInteger(1, 8) + '.png',
    },
    offer: {
      title: 'Лучшее предложение',
      address: `${x}, ${y}`,
      price: getRandomInteger(2000, 10000),
      type: getRandomElement(TYPES),
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 5),
      checkin: getRandomElement(TIMES),
      checkout: getRandomElement(TIMES),
      features: getRandomArray(FEATURES),
      description: 'Номер класса люкс с видом на море',
      photos: getRandomArray(PHOTOS),
    },
    location: {
      x,
      y,
    },
  };
};

const getRandomAdvertisings = function () {
  const advertisings = [];
  for (let i = 0; i < ADS_COUNT; i++) {
    advertisings.push(createAdvertising());
  }
  return advertisings;
};

export {createAdvertising, getRandomAdvertisings};
