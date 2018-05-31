import { combineReducers } from 'redux';
import { user } from './user';
import { recentEvents } from './recentEvents';
import { selectedEvent } from './selectedEvent';
import { suggestedRestaurants } from './suggestedRestaurants';

export const rootReducer = combineReducers({
  user,
  recentEvents, 
  selectedEvent,
  suggestedRestaurants
})
