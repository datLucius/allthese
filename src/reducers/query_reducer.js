import {
  GOT_SESSION,
  GOT_ALL_SESSIONS,
  TOGGLE_RESULT,
  LOAD_START,
  LOAD_END
} from '../actions/types';

const INITIAL_STATE = {
  sessions: [],
  sessionArray: [],
  currentSession: {},
  loading: false,
  selectedSession: '123'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GOT_SESSION:
      return { ...state, currentSession: action.payload };
    case GOT_ALL_SESSIONS:
      return { ...state, sessions: action.payload };
    case LOAD_START:
      return { ...state, loading: true };
    case LOAD_END:
      return { ...state, loading: false };
    case TOGGLE_RESULT:
      return { ...state, selectedSession: action.payload };
    default:
      return state;
  }
};
