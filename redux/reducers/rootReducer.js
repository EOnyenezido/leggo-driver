import { combineReducers } from 'redux';
import userDetails from './userDetails';
import watchLocation from './watchLocation';

export default combineReducers({
  userDetails,
  watchLocation,
})