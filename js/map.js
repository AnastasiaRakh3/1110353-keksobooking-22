import {getRandomAdvertisings} from './data.js';

const randomAdvertisings = getRandomAdvertisings();
const addForm = document.querySelector('.ad-form');
const filtersMapForm = document.querySelector('.map__filters');
const mapCanvas = document.querySelector('.map__canvas');

// Даективировать формы

const makeDisabledForms = function () {
  addForm.classList.add('ad-form--disabled');
  filtersMapForm.classList.add('map__filters--disabled');
  for (let i = 0; i < addForm.elements.length; i++) {
    addForm.elements[i].disabled = true;
  }
  for (let i = 0; i < filtersMapForm.elements.length; i++) {
    filtersMapForm.elements[i].disabled = true;
  }
};

makeDisabledForms();

// Активировать формы

const makeAbledForms = function () {
  addForm.classList.remove('ad-form--disabled');
  filtersMapForm.classList.remove('map__filters--disabled');
  for (let i = 0; i < addForm.elements.length; i++) {
    addForm.elements[i].disabled = false;
  }
  for (let i = 0; i < filtersMapForm.elements.length; i++) {
    filtersMapForm.elements[i].disabled = false;
  }
};

// Создаю карту и событие инициализации карты

const map = L.map(mapCanvas)
  .on('load', () => {
    makeAbledForms()
  })
  .setView(
    {
      lat: 35.4122,
      lng: 139.413,
    },
    10,
  );

// Создаю слой и добавляю на карту

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Создаю иконку на главный пин

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// Создаю главный пин и добавляю на карту

const mainPinMarker = L.marker(
  {
    lat: 35.4122,
    lng: 139.413,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

// Добавляю обработчик события маркета

mainPinMarker.on('moveend', (evt) => {
  console.log(evt.target.getLatLng());
});

mainPinMarker.remove();

// Добавляю обычные метки с иконками на карту??? Проблемы с локацией

randomAdvertisings.forEach((add) => {
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat: add.location.x,
      lng: add.location.y,
    },
    {
      icon,
    },
  );

  marker.addTo(map);
});
