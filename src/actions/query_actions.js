import { browserHistory } from 'react-router';
import axios from 'axios';

import {
  GOT_ALL_SESSIONS,
  GOT_SESSION,
  TOGGLE_RESULT,
  LOAD_START,
  LOAD_END,
  LOAD_ERROR
} from './types';

function getThis(route, query) {
  const getObject = {
    method: 'get',
    url: `${process.env.API_URL}${route}`,
    params: {
      subject_id: query.subject_id,
      date: query.date
    }
  };
  return axios(getObject);
}

export function getSessionsByParams(params) {
  return (dispatch) => {
    dispatch({
      type: LOAD_START
    });
    getThis('/sessions', params)
      .then((res) => {
        dispatch({
          type: GOT_ALL_SESSIONS,
          payload: res.data.data
        });
        dispatch({
          type: LOAD_END
        });
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

export function getResults(id, sessionDate) {
  return (dispatch) => {
    browserHistory.push(`/results/${id}/${sessionDate}`);
    dispatch({
      type: 'get_results'
    });
  };
}
