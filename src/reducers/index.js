import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import queryReducer from './query_reducer';
import authReducer from './auth_reducer';


const rootReducer = combineReducers({
  form,
  authReducer,
  queryReducer
});

export default rootReducer;
