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
    formattedDate = `${query.date}T00:00:00.000Z`;
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
        console.log('sessions', res.data);
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

function applyOffSet(time) {
  const offSet = new Date().getTimezoneOffset() / 60;
  const offSetDate = moment(time).add(-offSet, 'h').format();
  return new Date(offSetDate).getTime();
}

export function getResults(id, sessionDate) {
  return (dispatch) => {
    if (sessionDate) {
      const s = sessionDate.split("/");
      const formattedSessionDate = `${s[2]}-${s[0]}-${s[1]}`;
      browserHistory.push(`/results/${id}/${formattedSessionDate}`);
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
      const { session_id, subject_id, created_at, frames_list, device_address } = session.data.data;
      const csvArray = [
        `sessionID: ${session_id}`,
        `subjectID: ${subject_id}`,
        `created_at: ${moment(created_at).format('MM/DD/YYYY')}`, `sessionTime: ${moment(created_at).format('h:mm:ss a')}`, `device_address: ${device_address}`];
      if (frames_list) {
        csvArray.push('\nframe, an_in, dig_in, seq, , ECG (V), ECG (mV), qrs, r-r');
        _.each(frames_list, (frame, i) => {
          const ECGV = (((frame.an_in[0] / 65536) - 0.5) * 0.3) / 1000;
          const ECGMV = ECGV * 0.1;
          const frameString = `\n${i}, ${frame.an_in[0]}, ${frame.dig_in}, ${frame.seq}, , ${ECGV}, ${ECGMV}`;
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
          console.log('this', axiosObjects);
          const fileName = axiosObjects[0].data.data.session_id;
          formatSessionObjects(axiosObjects)
            .then((formattedSessions) => {
              buildCSVString(formattedSessions)
                .then((csvContent) => {
                  const link = document.createElement('a');
                  link.setAttribute('href', csvContent);
                  link.setAttribute('download', `${fileName}.csv`);
                  link.click();
                  dispatch({ type: LOAD_END });
                });
            });
        });
      });
  };
}
