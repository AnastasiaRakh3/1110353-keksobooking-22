'use strict';

import { adForm, showLatLng, TOKYO_CENTER, resetLocation } from './map.js';
import { sendData } from './api.js';
import { showSuccessBlock, showErrorBlock } from './template.js';

const MinPrices = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000,
};
const housingTypeSelect = adForm.querySelector('#type');
const pricePerDayInput = adForm.querySelector('#price');
const timeInInput = adForm.querySelector('#timein');
const timeOutInput = adForm.querySelector('#timeout');

const roomNumberInput = adForm.querySelector('#room_number');
const capacityInput = adForm.querySelector('#capacity');
const formButtonSubmit = adForm.querySelector('.ad-form__submit');

const allFormFields = adForm.elements;
const adFormButton= adForm.querySelector('.ad-form__submit');

const addressInput = adForm.querySelector('#address');

/** Функция, записывающая в поле локацию по умолчанию */
const setAddressDefault = (field) => {
  const addressDefault = `${TOKYO_CENTER.lat.toFixed(5)}, ${TOKYO_CENTER.lng.toFixed(5)}`;
  field.value = addressDefault;
};

setAddressDefault(addressInput);

/** Запись локации главного пина при движении в поле адреса */
showLatLng(addressInput);

/** Валидация полей чекина и чекаута и полей цены с типом жилья */
const selectMinPrice = () => {
  const minPrice = MinPrices[housingTypeSelect.value.toUpperCase()];
  pricePerDayInput.min = minPrice;
  pricePerDayInput.placeholder = minPrice;
};

selectMinPrice();
housingTypeSelect.addEventListener('change', selectMinPrice);

const synchronizeTimeIn = () => {
  timeInInput.value = timeOutInput.value;
};

const synchronizeTimeOut = () => {
  timeOutInput.value = timeInInput.value;
};

timeInInput.addEventListener('change', synchronizeTimeOut);
timeOutInput.addEventListener('change', synchronizeTimeIn);

/** Валидация полей кол-ва комнат и кол-ва гостей */
const checkRoomsGuests = () => {
  if (Number(capacityInput.value) > Number(roomNumberInput.value)) {
    capacityInput.setCustomValidity(
      'Не допустимый вариант выбора количества гостей для выбранного колличества комнат',
    );
  } else if (
    (!(capacityInput.value === '0') && roomNumberInput.value === '100') ||
    (capacityInput.value === '0' && !(roomNumberInput.value === '100'))
  ) {
    capacityInput.setCustomValidity(
      'Для этого варианта только - "100 комнат - не для гостей"',
    );
  } else {
    capacityInput.setCustomValidity('');
  }
};

formButtonSubmit.addEventListener('click', checkRoomsGuests);

/** Проверка на валидацию всей формы, выделяя красной рамкой неправильно введенные поля */
for (let i = 0; i < allFormFields.length; i++) {
  allFormFields[i].addEventListener('invalid', (evt) => {
    evt.target.style.border = 'solid 3px red';
  });
}

adFormButton.addEventListener('click', () => {
  for (let i = 0; i < allFormFields.length; i++) {
    allFormFields[i].removeAttribute('style');
  }
});

/** Функция в случае успешного отправления формы */
const setAllSuccessActions = () => {
  showSuccessBlock();
  adForm.reset();
  resetLocation();
  setAddressDefault(addressInput);
};

/** Отправка формы */
const setUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => showErrorBlock(),
      new FormData(evt.target),
    );
  });
};

export { setAllSuccessActions, setUserFormSubmit };
