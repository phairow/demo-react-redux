import { AnyAction } from 'redux';
import { AuthState, defaultAuthState } from '../auth/session';

export const AUTH_LOGIN_REQUEST = 'auth/AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'auth/AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'auth/AUTH_LOGIN_FAILURE';
export const AUTH_LOGOUT = 'auth/AUTH_LOGOUT';
export const AUTH_CLEAR_ERROR = 'auth/AUTH_CLEAR_ERROR';

export default function authReducer(
  state: AuthState = defaultAuthState,
  action: AnyAction
): AuthState {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      };
    case AUTH_LOGIN_FAILURE:
      return {
        ...defaultAuthState,
        error: action.payload,
      };
    case AUTH_LOGOUT:
      return {
        ...defaultAuthState,
      };
    case AUTH_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
