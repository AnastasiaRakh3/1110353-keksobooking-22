import {initMap} from './map.js';
import {getData} from './api.js';
import {showErrorBlockGetData} from './template.js';
import {setUserFormSubmit, setAllSuccessActions} from './form.js';

const main = () => {
  getData(initMap, showErrorBlockGetData);
  setUserFormSubmit(setAllSuccessActions);
}

main();
