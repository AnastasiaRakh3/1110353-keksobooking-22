'use strict';
import {addForm, showLatLng} from './map.js';
import {sendData} from './api.js';
import {showErrorBlock} from './template.js';

const housingTypeSelect = addForm.querySelector('#type');
const pricePerDayInput = addForm.querySelector('#price');
const timeInInput = addForm.querySelector('#timein');
const timeOutInput = addForm.querySelector('#timeout');

const roomNumberinput = addForm.querySelector('#room_number');
const capacityinput = addForm.querySelector('#capacity');
const formBtnSubmit = addForm.querySelector('.ad-form__submit');

const addressInput = addForm.querySelector('#address');
addressInput.value = '35.685471,139.753590';
showLatLng(addressInput);

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

const checkRoomsGuests = function () {
  if(Number(capacityinput.value) > Number(roomNumberinput.value) || capacityinput.value === '0' && !(roomNumberinput.value === '100')) {
    capacityinput.setCustomValidity('Не допустимый вариант выбора количества гостей для выбранного колличества комнат');
  } else if(!(capacityinput.value === '0') && roomNumberinput.value === '100') {
    capacityinput.setCustomValidity('Единственный возможный вариант для 100 комнат - это "не для гостей"');
  }
  else {
    capacityinput.setCustomValidity('');
  }
}

formBtnSubmit.addEventListener('click', checkRoomsGuests);

// Проверка на валидацию всей формы, выделяя красной рамкой неправильно введенные поля


const checkValidity = function () {
  const invalidElements = addForm.querySelectorAll('input:invalid, select:invalid');
  const allElements = addForm.querySelectorAll('input, select');

  for (let i = 0; i < allElements.length; i++){
    allElements[i].style.border = '1px solid #d9d9d3';
  }

  if (invalidElements.length) {
    for (let i = 0; i < invalidElements.length; i++){
      invalidElements[i].style.border = 'solid 3px red';
    }
  }
}

addForm.addEventListener('click', checkValidity);

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
