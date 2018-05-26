import { combineReducers } from 'redux';
import { user } from './user';
import { recentEvents } from './recentEvents';

export const rootReducer = combineReducers({
  user,
  recentEvents
})
