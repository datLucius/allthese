import {
  GOT_RESULTS
} from '../actions/types';

const INITIAL_STATE = {
  results: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GOT_RESULTS:
      return { ...state, results: action.payload };
    default:
      return state;
  }
};
