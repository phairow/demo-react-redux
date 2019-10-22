import { AppState } from '../store';
import { createSelector } from 'reselect';

export const spacesSelector = (state: AppState) => {
  return state.spaces.byId;
};

export const allSpacesListSelector = (state: AppState) => {
  return state.allSpaces.data;
}

export const allSpacesSelector = createSelector([allSpacesListSelector, spacesSelector], (allSpacesList, spaces) => {
  console.log(allSpacesList)
  console.log(spaces)
  return allSpacesList !== undefined ? allSpacesList.map((id: string) => spaces[id]) : [];
});