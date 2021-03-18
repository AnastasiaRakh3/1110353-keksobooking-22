'use strict';

const Prices = {START_PRICE: 10000, END_PRICE: 50000};
const filtersMapForm = document.querySelector('.map__filters');
const housingType = filtersMapForm.querySelector('#housing-type');
const housingPrice = filtersMapForm.querySelector('#housing-price');
const housingRooms = filtersMapForm.querySelector('#housing-rooms');
const housingGuests = filtersMapForm.querySelector('#housing-guests');
const featuresMapForm = filtersMapForm.querySelectorAll('.map__features input');

/** Проверка на совпадение типа комнаты */
const checkHousingType = (ad) => {
  return housingType.value === 'any' || housingType.value === ad.offer.type;
};

/** Проверка на ценновой диапазон */
// const checkHousingPrice = (ad) => {
//   if ('any' === housingPrice.value) {
//     return true;
//   }
//   if ('middle' === housingPrice.value &&
//       Prices.START_PRICE <= ad.offer.price &&
//       Prices.END_PRICE > ad.offer.price) {
//     return true;
//   }
//   if ('low' === housingPrice.value && Prices.START_PRICE > ad.offer.price) {
//     return true;
//   }
//   if ('high' === housingPrice.value && Prices.END_PRICE <= ad.offer.price) {
//     return true;
//   }
//   return false;
// };

const checkHousingPrice = (ad) => {
  switch (ad) {
    case housingPrice.value === 'middle':
      return ad.offer.price >= Prices.START_PRICE && ad.offer.price < Prices.END_PRICE;
    case housingPrice.value === 'low':
      return ad.offer.price < Prices.START_PRICE;
    case housingPrice.value === 'high':
      return ad.offer.price >= Prices.END_PRICE;
    default:
      return housingType.value === 'any';
  }
};

/** Проверка на совпадение кол-ва комнат */
const checkHousingRooms = (ad) => {
  if (housingRooms.value === 'any') {
    return true;
  }
  return Number(housingRooms.value) === ad.offer.rooms;
};

/** Проверка на совпадение кол-ва гостей */
const checkHousingGuests = (ad) => {
  if (housingGuests.value === 'any') {
    return true;
  }
  return Number(housingGuests.value) === ad.offer.guests;
};

/** Проверка на совпадение удобств */
const checkMatchedFeatures = (pin) => {
  const selectedFeatures = Array.from(featuresMapForm).filter(
    (checkbox) => checkbox.checked,
  );
  return selectedFeatures.every((selectedFeature) => {
    return pin.offer.features.includes(selectedFeature.value);
  });
};

/** Функция, создающая новый массив, с отфильтрованными пинами */
const filterPins = (pins) => {
  const filterPins = [];
  for (let i = 0; i < pins.length && filterPins.length < 10; i++) {
    if (
      checkHousingType(pins[i]) &&
      checkHousingRooms(pins[i]) &&
      checkMatchedFeatures(pins[i]) &&
      checkHousingPrice(pins[i]) &&
      checkHousingGuests(pins[i])
    ) {
      filterPins.push(pins[i]);
    }
  }
  return filterPins;
};

/**  Функция, в которой обработчик события на изменение в фильтре */
const setFilterOptionsChange = (cb) => {
  filtersMapForm.addEventListener('change', () => {
    cb();
  });
};

export { filterPins, filtersMapForm, setFilterOptionsChange };
