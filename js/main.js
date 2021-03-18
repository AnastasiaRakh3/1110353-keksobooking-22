import { getData } from './api.js';
import { showErrorBlockGetData } from './template.js';
import { setUserFormSubmit, setAllSuccessActions } from './form.js';
import { setAllActionsOnMap } from './map.js';

const main = () => {
  getData (
    (offers) => {
      setAllActionsOnMap (offers);
    }, showErrorBlockGetData);

  setUserFormSubmit(setAllSuccessActions);
};

main();
