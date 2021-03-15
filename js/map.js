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


const makeDisabledForms = function () {
  addForm.classList.add('ad-form--disabled');
  filtersMapForm.classList.add('map__filters--disabled');

  for (let i = 0; i < formFields.length; i++) {
    formFields[i].disabled = true;
  }
};

makeDisabledForms();

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

mainPinMarker.on('moveend', (evt) => {
  evt.target.getLatLng();
});

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

const showLatLng = (input) => {
  mainPinMarker.on('moveend', (evt) => {
    const latLngObj = evt.target.getLatLng();
    const addressText = `${latLngObj.lat.toFixed(5)}, ${latLngObj.lng.toFixed(5)}`;
    input.value = addressText;
  });
}

export {addForm, initMap, showLatLng, TOKYO_CENTER};
