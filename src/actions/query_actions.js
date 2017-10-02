import axios from 'axios';

import {
  GOT_ALL_SESSIONS,
  GOT_SESSION,
  TOGGLE_RESULT,
  LOAD_START,
  LOAD_END
} from './types';

const API_URL = 'https://zeriscope-web-army.herokuapp.com/api';

function getThis(route) {
  return axios({
    method: 'get',
    url: `${API_URL}${route}`
  });
}


export function getAllSessions() {
  return (dispatch) => {
    dispatch({
      type: LOAD_START
    });
    getThis('/sessions')
      .then((res) => {
        dispatch({
          type: GOT_ALL_SESSIONS,
          payload: res.payload
        });
        dispatch({
          type: LOAD_END
        });
      })
      .catch((err) => {
        console.log('err', err);
        dispatch({
          type: LOAD_END
        });
      });
  };
}

export function getSession(id) {
  return (dispatch) => {
    getThis(`/sessions/${id}`)
      .then((res) => {
        dispatch({
          type: GOT_SESSION,
          payload: res.payload
        });
      });
  };
}

export function toggleResult(id) {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_RESULT,
      payload: id
    });
  };
}
