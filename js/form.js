'use strict';

const housingTypeSelect = document.querySelector('#type');
const pricePerDayInput = document.querySelector('#price');
const timeInInput = document.querySelector('#timein');
const timeOutInput = document.querySelector('#timeout');

const minPrices = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000,
};

const selectMinPrice = function() {
  const minPrice = minPrices[housingTypeSelect.value.toUpperCase()];
  pricePerDayInput.min =  minPrice;
  pricePerDayInput.placeholder =  minPrice;
}

selectMinPrice();
housingTypeSelect.addEventListener('change', selectMinPrice);


const synchronizeTimeIn = function() {
  timeInInput.value = timeOutInput.value;
}

const synchronizeTimeOut = function() {
  timeOutInput.value = timeInInput.value;
}

timeInInput.addEventListener('change', synchronizeTimeOut);
timeOutInput.addEventListener('change', synchronizeTimeIn);
