import {
  TOGGLE_RESULT
} from './types';

export function toggleResult(id) {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_RESULT,
      payload: id
    });
  };
}
