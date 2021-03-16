'use strict';

import { createCard } from './template.js';

const leaflet = window.L;
const addForm = document.querySelector('.ad-form');
const filtersMapForm = document.querySelector('.map__filters');
const formFields = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters fieldset');
const mapCanvas = document.querySelector('.map__canvas');
const TOKYO_CENTER = {
  lat: 35.685471,
  lng: 139.75359,
};

/** Отключение формы */

const makeDisabledForms = () => {
  addForm.classList.add('ad-form--disabled');
  filtersMapForm.classList.add('map__filters--disabled');

  for (let i = 0; i < formFields.length; i++) {
    formFields[i].disabled = true;
  }
};

makeDisabledForms();

/** Активация формы при загрузке страницы */

const makeAbledForms = () => {
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

/** Добавление слоя на созданную карту */

leaflet
  .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  })
  .addTo(map);

const mainPinIcon = leaflet.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

/** Создание главного пина и добавление его на карту */

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

/** Создание метки на каждое полученное объявление
 *  Привязка балуна к каждой метке
 *  Создание карточки в этом балуне
 */

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

    marker.addTo(map).bindPopup(createCard(add), {
      keepInView: true,
    });
  });
};

/** Функция, выводящая локацию главного пина в нужное поле */

const showLatLng = (field) => {
  mainPinMarker.on('moveend', (evt) => {
    const latLngObj = evt.target.getLatLng();
    const addressPinText = `${latLngObj.lat.toFixed(5)}, ${latLngObj.lng.toFixed(5)}`;
    field.value = addressPinText;
  });
};

/** Функция, возвращающая главный пин в исходное положение */

const resetLocation = () => {
  mainPinMarker.setLatLng(TOKYO_CENTER);
};

export { addForm, initMap, showLatLng, TOKYO_CENTER, resetLocation };
