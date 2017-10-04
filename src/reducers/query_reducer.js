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
  loading: false
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
      const newSessions = state.sessionArray;
      const index = state.sessionArray.indexOf(action.payload);
      if (index !== -1) {
        newSessions.splice(index, 1);
      } else {
        newSessions.push(action.payload);
      }
      return { ...state, sessionArray: newSessions };
    default:
      return state;
  }
};
