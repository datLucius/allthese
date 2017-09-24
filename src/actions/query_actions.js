import axios from 'axios';

import {
  GOT_RESULTS
} from './types';

const API_URL = 'zeriscope-query-dashboard';

function sendQuery(query) {
  return axios({
    method: 'post',
    url: `${API_URL}/query`,
    data: {
      query
    }
  });
}

export function queryDB(query) {
  return (dispatch) => {
    sendQuery(query)
      .then((res) => {
        dispatch({
          type: GOT_RESULTS,
          payload: res.payload
        });
      });
  };
}
