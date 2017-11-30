import axios from 'axios';

import {
  LOAD_START,
  LOAD_END,
  LOAD_ERROR,
  GOT_CIGS,
  UPDATE_COLOR,
  UPDATE_PAGE
} from "../actions/types";

const cigColors = [
  "#635a15",
  "#c33825",
  "#377a4a",
  "#153a85",
  "#9a5c1b",
];

function getRandomWithOneExclusion(lengthOfArray, indexToExclude) {
  let rand = null;

  while (rand === null || rand === indexToExclude) {
    rand = Math.round(Math.random() * (lengthOfArray - 1));
  }

  return rand;
}

export function getCigs(url) {
  return (dispatch) => {
    dispatch({ type: LOAD_START });
    axios({
      method: 'get',
      url
    })
      .then((response) => {
        dispatch({ type: LOAD_END });
        dispatch({
          type: UPDATE_PAGE,
          payload: response.data.next
        });
        dispatch({
          type: GOT_CIGS,
          payload: response.data.results
        });
      })
      .catch((err) => {
        console.log('ERROR', err);
        dispatch({ type: LOAD_ERROR });
      });
  };
}

export function updateColor(color) {
  return (dispatch) => {
    const colorChoice = getRandomWithOneExclusion(cigColors.length, cigColors.indexOf(color));

    dispatch({
      type: UPDATE_COLOR,
      payload: cigColors[colorChoice]
    });
  };
}
