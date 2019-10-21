import { AppState } from '../store';

export const spacesSelector = (state: AppState) => {
  return state.spaces.byId;
};
