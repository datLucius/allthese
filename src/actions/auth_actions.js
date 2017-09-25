import { browserHistory } from 'react-router';

import {
  UNAUTH_USER
} from './types';

export function logOutUser() {
  return (dispatch) => {
    dispatch({
      type: UNAUTH_USER
    });
    browserHistory.push('/');
  };
}
