import { combineReducers } from '@reduxjs/toolkit';
import locationReducer from './reducers/location';
import userReducer from './reducers/user';

const rootReducer = combineReducers({
  location: locationReducer,
  user: userReducer,
});

export default rootReducer;
