import { combineReducers } from 'redux';
import { user } from './user';
import { recentEvents } from './recentEvents';
import { selectedEvent } from './selectedEvent';
import { suggestedRestaurants } from './suggestedRestaurants';
import { suggestedBars } from './suggestedBars';
import { location } from './location';
import { eventError } from './eventError';
import { barFilters } from './barFilters';
import { restaurantFilters } from './restaurantFilters';


export const rootReducer = combineReducers({
  user,
  recentEvents, 
  selectedEvent,
  suggestedRestaurants,
  suggestedBars,
  location,
  eventError,
  barFilters,
  restaurantFilters
})
