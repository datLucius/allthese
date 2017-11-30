import { combineReducers } from 'redux';

import cigs from './cig_reducer';


const rootReducer = combineReducers({
  cigs
});

export default rootReducer;
