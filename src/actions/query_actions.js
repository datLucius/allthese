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
  const formattedDate = new Date(Number(query.date)).toISOString();
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
    browserHistory.push(`/results/${id}/${sessionDate}`);
    dispatch({
      type: 'get_results'
    });
  };
}

function buildResultArray(session, currentArray) {
  return new Promise((resolve) => {
    getSession(session)
      .then((res) => {
        currentArray.push(res.data.data);
        resolve(currentArray);
      });
  });
}


function getAllSelectedSessions(sessionArray) {
  return new Promise((resolve) => {
    let csvResults = [];
    _.each(sessionArray, (session) => {
      buildResultArray(session, csvResults)
        .then((res) => {
          csvResults = res;
        });
    });
    resolve(csvResults);
  });
}

function formatSessionObjects(sessions) {
  return new Promise((resolve) => {
    console.log('format this', sessions);
    resolve(sessions.map((session) => {
      const rObj = [
        `sessionID: ${session.session_id}`,
        `subjectID: ${session.subject_id}`,
        `created_at: ${moment(session.created_at).format('MM/DD/YYYY')}`, `sessionTime: ${moment(session.sessionTime).format('MM/DD/YYYY')}`, `device_address: ${session.device_adress}`];
      _.each(session.frame_list, (frame, i) => {
        debugger; // eslint-ignore-line
        const frameString = `frame ${i} : an_in: ${frame.an_in[0]}, dig_in: ${frame.dig_in}, seq: ${frame.seq}`;
        rObj.push(frameString);
      });
      console.log('rObj', rObj);
      return rObj;
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
      .then((sessions) => {
        const formattedSessionArray = [];
        console.log('before for', sessions);
        sessions.forEach((session) => {
          console.log('this', session);
          const rObj = {
            sessionID: session.session_id,
            subjectID: session.subject_id,
            created_at: moment(session.created_at).format('MM/DD/YYYY'),
            sessionTime: moment(session.sessionTime).format('MM/DD/YYYY'),
            device_adress: session.device_adress
          };
          // _.each(session.frames_list, (frame, i) => {
          //   debugger; // eslint-ignore-line
          //   const frameString = `frame ${i} : an_in: ${frame.an_in[0]}, dig_in: ${frame.dig_in}, seq: ${frame.seq}`;
          //   rObj.push(frameString);
          // });
          console.log('rObj', rObj);
          formattedSessionArray.push(rObj);
        });
        console.log('formattedSess', formattedSessionArray);
        // formatSessionObjects(sessions)
        //   .then((formattedSessions) => {
        //     console.log('formattedsess', formattedSessions);
        //     buildCSVString(formattedSessions)
        //       .then((csvContent) => {
        //         dispatch({ type: LOAD_END });
        //         console.log('csvContent', csvContent);
        //         // window.open(csvContent);
        //       });
        //   });
      });
  };
}
