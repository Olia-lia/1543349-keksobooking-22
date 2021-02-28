import {disableFilter, activateFilter} from  './filter.js';
import {disableForm, activateForm} from './form.js';


const disablePage = () => {
  disableFilter();
  disableForm();
}

const activatePage = () => {
  activateForm();
  activateFilter();
}

export {disablePage, activatePage};
