'use strict';
import {addForm} from './map.js';
import {sendData} from './api.js';
import {showErrorBlock} from './template.js';

const housingTypeSelect = document.querySelector('#type');
const pricePerDayInput = document.querySelector('#price');
const timeInInput = document.querySelector('#timein');
const timeOutInput = document.querySelector('#timeout');

const roomNumberinput = document.querySelector('#room_number');
const capacityinput = document.querySelector('#capacity');

// Валидация полей чекина и чекаута

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

// Валидация полей кол-ва комнат и кол-ва гостей

const checkRooms = function () {
  if(roomNumberinput.value === '1' && capacityinput.value === '1') {
    capacityinput.style.backgroundColor = 'red';
    capacityinput.setCustomValidity('');
  }
  if(roomNumberinput.value === '2' && (capacityinput.value === '1'|| capacityinput.value === '2')) {
    capacityinput.style.backgroundColor = 'green';
    capacityinput.setCustomValidity('');
  }
  if(roomNumberinput.value === '3' && (capacityinput.value === '1'|| capacityinput.value === '2' || capacityinput.value === '3')) {
    capacityinput.style.backgroundColor = 'blue';
    capacityinput.setCustomValidity('');
  }
  if(roomNumberinput.value === '100' && (capacityinput.value === '0')) {
    capacityinput.style.backgroundColor = 'black';
    capacityinput.setCustomValidity('');
  }
  else {
    capacityinput.setCustomValidity('Не допустимый вариант выбора количества гостей для выбранного колличества комнат');
  }
  capacityinput.reportValidity();
}
// const checkRooms = function () {
//   if(roomNumberinput.value === '1' && !(capacityinput.value === '1')) {
//     capacityinput.style.backgroundColor = 'red';
//     capacityinput.setCustomValidity('Не допустимый вариант выбора количества гостей для выбранного колличества комнат');
//   }
//   if(roomNumberinput.value === '2' && !(capacityinput.value === '1'|| capacityinput.value === '2')) {
//     capacityinput.style.backgroundColor = 'green';
//     capacityinput.setCustomValidity('Не допустимый вариант выбора количества гостей для выбранного колличества комнат');
//   }
//   if(roomNumberinput.value === '3' && !(capacityinput.value === '1'|| capacityinput.value === '2' || capacityinput.value === '3')) {
//     capacityinput.style.backgroundColor = 'blue';
//     capacityinput.setCustomValidity('Не допустимый вариант выбора количества гостей для выбранного колличества комнат');
//   }
//   if(roomNumberinput.value === '100' && !(capacityinput.value === '0')) {
//     capacityinput.style.backgroundColor = 'black';
//     capacityinput.setCustomValidity('Не допустимый вариант выбора количества гостей для выбранного колличества комнат');
//   }
//   else {
//     capacityinput.setCustomValidity('');
//   }
//   capacityinput.reportValidity();
// };

capacityinput.addEventListener('change', checkRooms);
roomNumberinput.addEventListener('change', checkRooms);

// Отправка форма

const setUserFormSubmit = (onSuccess) => {
  addForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => showErrorBlock(),
      new FormData(evt.target),
    );
  });
};

export {setUserFormSubmit};
