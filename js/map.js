'use strict';

import { createCard } from './template.js';

const leaflet = window.L;
const addForm = document.querySelector('.ad-form');
const filtersMapForm = document.querySelector('.map__filters');
const formFields = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters fieldset');
const mapCanvas = document.querySelector('.map__canvas');
const TOKYO_CENTER = {
  lat: 35.685471,
  lng: 139.753590,
};

// Отключаем форму

const makeDisabledForms = function () {
  addForm.classList.add('ad-form--disabled');
  filtersMapForm.classList.add('map__filters--disabled');

  for (let i = 0; i < formFields.length; i++) {
    formFields[i].disabled = true;
  }
};

makeDisabledForms();

// Активируем форму при загрузке страницы

const makeAbledForms = function () {
  addForm.classList.remove('ad-form--disabled');
  filtersMapForm.classList.remove('map__filters--disabled');

  for (let i = 0; i < formFields.length; i++) {
    formFields[i].disabled = false;
  }
};

const map = leaflet
  .map(mapCanvas)
  .on('load', () => {
    makeAbledForms();
  })
  .setView(
    {
      lat: TOKYO_CENTER.lat,
      lng: TOKYO_CENTER.lng,
    },
    12,
  );

// Добавим слой на нашу созданную карту

leaflet
  .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  })
  .addTo(map);

const mainPinIcon = leaflet.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// Создаем главный пин и добавляем на карту

const mainPinMarker = leaflet.marker(
  {
    lat: TOKYO_CENTER.lat,
    lng: TOKYO_CENTER.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

// Создаем метки на каждое полученное объявление
// Привязываем к каждой метке балун
// Создаем карточку в этом балуне

const initMap = (serverOffers) => {
  serverOffers.forEach((add) => {
    const icon = leaflet.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = leaflet.marker(
      {
        lat: add.location.lat,
        lng: add.location.lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(
        createCard(add),
        {
          keepInView: true,
        });
  });
}

// Создаем функцию, которая будет выводить локацию главного пина в нужное поле

const showLatLng = (field) => {
  mainPinMarker.on('moveend', (evt) => {
    const latLngObj = evt.target.getLatLng();
    const addressText = `${latLngObj.lat.toFixed(5)}, ${latLngObj.lng.toFixed(5)}`;
    field.value = addressText;
  });
}

// Создаю функцию, которая возвращает главный пин на исходное место

const resetLocation = () => {
  mainPinMarker.setLatLng(TOKYO_CENTER);
}

export {addForm, initMap, showLatLng, TOKYO_CENTER, resetLocation};
