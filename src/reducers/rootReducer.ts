import { combineReducers } from 'redux';
import {
    createNetworkStatusReducer,
    createSpaceReducer,
    createUserReducer,
    createSpaceListReducer,
    createUserListReducer,
    createMembershipReducer,
} from 'pubnub-redux';
import authReducer from './authReducer';
export default combineReducers({
 auth: authReducer,
 networkStatus: createNetworkStatusReducer(false),
 spaces: createSpaceReducer(),
 allSpaces: createSpaceListReducer(),
 users: createUserReducer(),
 allUsers: createUserListReducer(),
 membership: createMembershipReducer()
});
