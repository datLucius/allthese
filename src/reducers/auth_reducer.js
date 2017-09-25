import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  GOT_ACCOUNT
} from '../actions/types';

const INITIAL_STATE = {
  loggedIn: true
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case GOT_ACCOUNT:
      return { ...state, user_account: action.payload };
    default:
      return state;
  }
}
