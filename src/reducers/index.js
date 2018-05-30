import { combineReducers } from 'redux';
import { user } from './user';
import { recentEvents } from './recentEvents';
import { selectedEvent } from './selectedEvent';

export const rootReducer = combineReducers({
  user,
  recentEvents, 
  selectedEvent
})
