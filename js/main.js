import { initMap } from './map.js';
import './form.js';
import { setUserFormSubmit } from './form.js';
import {showSuccessBlock} from './template.js';
import { getData } from './api.js';

const main = () => {
  getData(initMap);
  setUserFormSubmit(showSuccessBlock);
}

main();
