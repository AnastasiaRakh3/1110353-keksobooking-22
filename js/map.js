'use strict';

import { createCard } from './template.js';
import { filtersMapForm, filterPins, setFilterOptionsChange } from './form-filters.js';

const TOKYO_CENTER = {lat: 35.685471, lng: 139.75359};
const MapOptions = {
  MAP_SCALE: 10,
  ICON_MAIN_WIDTH: 52,
  ICON_MAIN_HEIGTH: 52,
  ICON_WIDTH: 40,
  ICON_HEIGTH: 40,
};
const leaflet = window.L;
const addForm = document.querySelector('.ad-form');
const formFields = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters fieldset');
const mapCanvas = document.querySelector('.map__canvas');
let markers = [];
const serverOffers = [];

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

/** Отрисовка при загрузке страницы */
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
    MapOptions.MAP_SCALE,
  );

/** Добавление слоя на созданную карту */
leaflet
  .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  })
  .addTo(map);

const mainPinIcon = leaflet.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MapOptions.ICON_MAIN_WIDTH, MapOptions.ICON_MAIN_HEIGTH],
  iconAnchor: [MapOptions.ICON_MAIN_WIDTH/2, MapOptions.ICON_MAIN_HEIGTH],
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

/** Функция, очищающая метки на карте */
const clearMap = () => {
  markers.forEach((marker)=> {
    marker.remove();
  })
  markers = [];
};

/** Очистка отрисованных маркеров
 *  Создание метки на каждое отфильтрованное объявление
 *  Привязка балуна к каждой метке
 *  Создание карточки в этом балуне
 *  Добавление отрисованного маркера в массив с маркерами, чтобы потом его можно было очистить при фильтрации
 */
const renderPins = (pins) => {
  clearMap();
  filterPins(pins).forEach((ad) => {
    const icon = leaflet.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [MapOptions.ICON_WIDTH, MapOptions.ICON_HEIGTH],
      iconAnchor: [MapOptions.ICON_WIDTH/2, MapOptions.ICON_HEIGTH],
    });

    const marker = leaflet.marker(
      {
        lat: ad.location.lat,
        lng: ad.location.lng,
      },
      {
        icon,
      },
    );

    marker.addTo(map).bindPopup(createCard(ad), {
      keepInView: true,
    });

    markers.push(marker);
  });
};

/** Функция, инициализирующая модуль с копированными данных */
const initMap = (pins) => {
  serverOffers.push(...pins);
  renderPins(serverOffers);
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

/** Загрузка данных и их фильтрация на карте */
const setAllActionsOnMap = (offers) => {
  initMap(offers);
  setFilterOptionsChange(() => renderPins(offers));
}

export { addForm, initMap, showLatLng, TOKYO_CENTER, resetLocation, setAllActionsOnMap };
