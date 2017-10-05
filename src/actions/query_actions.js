import { browserHistory } from 'react-router';
import axios from 'axios';
import _ from 'underscore';
import moment from 'moment';

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
      date: query.date.toISOString()
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
  return axios({
    method: 'get',
    url: `${process.env.API_URL}/session/${id}`,
  });
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

function getAllSelectedSessions(sessionArray) {
  return new Promise((resolve) => {
    const csvResults = [];
    _.forEach(sessionArray, (session) => {
      getSession(session)
        .then((res) => {
          csvResults.push(res.data);
        });
    });
    resolve(csvResults);
  });
}

function formatSessionObjects(sessions) {
  return new Promise((resolve) => {
    const data = sessions.map((session) => {
      const rObj = [`sessionID: ${session.session_id}`, `subjectID: ${session.subject_id}`, `created_at: ${moment(session.created_at).format('MM/DD/YYYY')}`, `sessionTime: ${moment(session.sessionTime).format('MM/DD/YYYY')}`, `device_address: ${session.device_adress}`, `device_description: ${session.device_description}`];
      return rObj;
    });
    resolve(data);
  });
}

function buildCSVString(data) {
  return new Promise((resolve) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    _.each(data, (infoArray, index) => {
      const dataString = infoArray.join(", ");
      csvContent += index < data.length ? `${dataString}\n` : dataString;
    });
    resolve(encodeURI(csvContent));
  });
}

export function buildCSV(sessionArray) {
  return (dispatch) => {
    dispatch({ type: LOAD_START });
    getAllSelectedSessions(sessionArray)
      .then((sessions) => {
        formatSessionObjects(sessions)
          .then((formattedSessions) => {
            buildCSVString(formattedSessions)
              .then((csvContent) => {
                dispatch({ type: LOAD_END });
                window.open(csvContent);
              });
          });
      });
  };
}
