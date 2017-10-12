import { browserHistory } from 'react-router';
import axios from 'axios';
import _ from 'underscore';
import moment from 'moment';

import {
  GOT_ALL_SESSIONS,
  TOGGLE_RESULT,
  LOAD_START,
  LOAD_END,
  LOAD_ERROR
} from './types';

function getThis(route, query) {
  let formattedDate = false;
  if (query.date !== 'undefined') {
    formattedDate = new Date(Number(query.date)).toISOString();
  }
  const getObject = {
    method: 'get',
    url: `${process.env.API_URL}${route}`,
    params: {
      subject_id: query.subject_id,
      date: formattedDate
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
    if (sessionDate) {
      browserHistory.push(`/results/${id}/${sessionDate}`);
    } else {
      browserHistory.push(`/results/${id}/undefined`);
    }
    dispatch({
      type: 'get_results'
    });
  };
}

function getAllSelectedSessions(sessionArray) {
  return new Promise((resolve) => {
    const promises = [];
    _.each(sessionArray, (id) => {
      promises.push(axios.get(`${process.env.API_URL}/session/${id}`));
    });
    resolve(promises);
  });
}

function formatSessionObjects(sessions) {
  return new Promise((resolve) => {
    resolve(sessions.map((session) => {
      const { session_id, subject_id, created_at, sessionTime, frames_list, device_address } = session.data.data;
      const csvArray = [
        `sessionID: ${session_id}`,
        `subjectID: ${subject_id}`,
        `created_at: ${moment(created_at).format('MM/DD/YYYY')}`, `sessionTime: ${moment(sessionTime).format('h:mm:ss a')}`, `device_address: ${device_address}`];
      if (frames_list) {
        csvArray.push('\nframe, an_in, dig_in, seq');
        _.each(frames_list, (frame, i) => {
          const frameString = `\n${i}, ${frame.an_in[0]}, ${frame.dig_in}, ${frame.seq}`;
          csvArray.push(frameString);
        });
      }
      return csvArray;
    }));
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
      .then((promises) => {
        axios.all(promises).then((axiosObjects) => {
          formatSessionObjects(axiosObjects)
            .then((formattedSessions) => {
              buildCSVString(formattedSessions)
                .then((csvContent) => {
                  window.open(csvContent);
                  dispatch({ type: LOAD_END });
                });
            });
        });
      });
  };
}
