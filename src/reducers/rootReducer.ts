import { combineReducers } from 'redux';
import {
    createNetworkStatusReducer,
    createSpaceReducer,
    createUserReducer,
    createSpaceListReducer,
    createUserListReducer,
    createMembershipReducer,
} from 'pubnub-redux';
export default combineReducers({
 networkStatus: createNetworkStatusReducer(false),
 spaces: createSpaceReducer(),
 allSpaces: createSpaceListReducer(),
 users: createUserReducer(),
 allUsers: createUserListReducer(),
 membership: createMembershipReducer()
});
