import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  GOT_ACCOUNT,
  LOAD_START,
  LOAD_END
} from '../actions/types';

const INITIAL_STATE = {
  loggedIn: true,
  loading: false
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
    case LOAD_START:
      return { ...state, loading: true };
    case LOAD_END:
      return { ...state, loading: false };
    default:
      return state;
  }
}
