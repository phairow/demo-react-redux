import { Dispatch } from 'redux';
import { mockLogin } from '../auth/mockAuthApi';
import { persistAuthState } from '../auth/session';
import {
  AUTH_CLEAR_ERROR,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
} from '../reducers/authReducer';
import { AppState } from '../store';

export function login(email: string, password: string) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: AUTH_LOGIN_REQUEST,
    });

    try {
      const user = await mockLogin(email, password);
      const action = {
        type: AUTH_LOGIN_SUCCESS,
        payload: user,
      };

      dispatch(action);
      persistAuthState({
        isAuthenticated: true,
        user,
        loading: false,
        error: null,
      });
    } catch (error) {
      dispatch({
        type: AUTH_LOGIN_FAILURE,
        payload: error instanceof Error ? error.message : 'Unable to log in.',
      });
      persistAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      });
    }
  };
}

export function logout() {
  return (dispatch: Dispatch, getState: () => AppState) => {
    dispatch({
      type: AUTH_LOGOUT,
    });

    persistAuthState(getState().auth);
  };
}

export function clearAuthError() {
  return {
    type: AUTH_CLEAR_ERROR,
  };
}
