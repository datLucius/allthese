import { browserHistory } from 'react-router';
import axios from 'axios';

import {
  UNAUTH_USER,
  LOAD_START,
  LOAD_END,
  LOAD_ERROR,
  GOT_USER
} from './types';

const API_URL = 'https://zeriscope-web-army.herokuapp.com/api';

export function logOutUser() {
  return (dispatch) => {
    dispatch({
      type: UNAUTH_USER
    });
    browserHistory.push('/');
  };
}

function getUser(username, password) {
  return axios({
    method: 'get',
    url: `${API_URL}/user/${username}/${password}`
  });
}

export function signinUser(username, password) {
  return (dispatch) => {
    dispatch({
      type: LOAD_START
    });
    getUser(username, password)
      .then((res) => {
        console.log('res', res);
        dispatch({
          type: GOT_USER,
          payload: res.data
        });
        dispatch({
          type: LOAD_END
        });
        localStorage.setItem('user', JSON.stringify(res.data));
        browserHistory.push('/search');
      })
      .catch((err) => {
        dispatch({
          type: LOAD_ERROR,
          payload: err.data
        });
        dispatch({
          type: LOAD_END
        });
      });
  };
}
