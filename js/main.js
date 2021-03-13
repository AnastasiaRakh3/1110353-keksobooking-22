// import {createAdvertising, getRandomAdvertisings} from './data.js';
// import { createCard } from './template.js';
import { initMap } from './map.js';
// import './api.js';
import './form.js';
import { setUserFormSubmit } from './form.js';
import {showSuccessBlock} from './template.js';
import { getData } from './api.js';

const main = () => {
  getData(initMap);
  setUserFormSubmit(showSuccessBlock);
}

main();
