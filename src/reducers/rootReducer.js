import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import { createNetworkStatusReducer } from 'pubnub-redux';  
export default combineReducers({
 'simple': simpleReducer,
 'networkStatus': createNetworkStatusReducer(false)
});