import {
  GOT_CIG,
  GOT_CIGS,
  LOAD_START,
  LOAD_END,
  UPDATE_PAGE
} from '../actions/types';

const INITIAL_STATE = {
  cigs: [],
  currentCig: {},
  color: '#ff4136',
  page: 'https://cigmap.herokuapp.com/artifacts?page=1'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GOT_CIGS:
      return { ...state, cigs: [...state.cigs.concat(action.payload)] };
    case GOT_CIG:
      return { ...state, currentCig: action.payload };
    case LOAD_START:
      return { ...state, loading: true };
    case LOAD_END:
      return { ...state, loading: false };
    case UPDATE_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};
