import { AppState } from '../store';

export const userSelector = (state: AppState) => {
  return state.users.byId;
};
