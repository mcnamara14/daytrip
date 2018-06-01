import { combineReducers } from 'redux';
import { user } from './user';
import { recentEvents } from './recentEvents';
import { selectedEvent } from './selectedEvent';
import { suggestedRestaurants } from './suggestedRestaurants';
import { suggestedBars } from './suggestedBars';


export const rootReducer = combineReducers({
  user,
  recentEvents, 
  selectedEvent,
  suggestedRestaurants,
  suggestedBars
})
