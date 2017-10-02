import {
  GOT_SESSION,
  GOT_ALL_SESSIONS,
  TOGGLE_RESULT,
  LOAD_START,
  LOAD_END
} from '../actions/types';

const exampleResults = [
  {
    sessionId: 1231232,
    subjectId: 12367774,
    sessionDate: new Date(),
    sessionTime: new Date(),
    deviceId: 3,
    id: 345,
    csv: false,
    sensorData: 'data 1'
  },
  {
    sessionId: 99886632,
    subjectId: 3455574,
    sessionDate: new Date(),
    sessionTime: new Date(),
    deviceId: 4,
    id: 114,
    csv: false,
    sensorData: 'data 2'
  },
  {
    sessionId: 9123123632,
    subjectId: 37457457,
    sessionDate: new Date(),
    sessionTime: new Date(),
    deviceId: 2,
    id: 984,
    csv: false,
    sensorData: 'data 4'
  }
];
const INITIAL_STATE = {
  sessions: exampleResults,
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
