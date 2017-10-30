import { browserHistory } from 'react-router';
import axios from 'axios';

import {
  AUTH_USER,
  UNAUTH_USER,
  LOAD_START,
  LOAD_END,
  LOAD_ERROR
} from './types';

export function logOutUser() {
  return (dispatch) => {
    dispatch({
      type: UNAUTH_USER
    });
    localStorage.removeItem('user');
    browserHistory.push('/');
  };
}

function getUser(username, password) {
  return axios({
    method: 'get',
    url: `https://zeriscope-web-army.herokuapp.com/api/user/${username}/${password}`
  });
}

export function signinUser(username, password) {
  return (dispatch) => {
    dispatch({
      type: LOAD_START
    });
    getUser(username, password)
      .then((res) => {
        dispatch({
          type: AUTH_USER,
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

export function checkForUser() {
  return dispatch => new Promise((resolve) => {
    if (localStorage.getItem('user')) {
      dispatch({
        type: AUTH_USER,
        payload: JSON.parse(localStorage.getItem('user'))
      });
      resolve(localStorage.getItem('user'));
    }
  });
}
