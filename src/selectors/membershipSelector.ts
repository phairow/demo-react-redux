import { AppState } from '../store';
import { User } from 'pubnub-redux';
import { createSelector } from 'reselect';
import { spacesSelector } from './spaceSelector';

export const membershipSelector = (user: User) => (state: AppState) => {
    return state.membership.byId[user.id];
};

export const membershipSpacesSelector = (user: User) => createSelector([membershipSelector(user), spacesSelector], (membership, spaces) => {
  return membership !== undefined ? membership.map((m: any) => spaces[m.id]) : [];
});