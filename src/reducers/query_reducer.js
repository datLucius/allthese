import {
  GOT_RESULTS,
  TOGGLE_RESULT
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
  results: exampleResults
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GOT_RESULTS:
      return { ...state, results: action.payload };
    case TOGGLE_RESULT:
      return state;
    default:
      return state;
  }
};
