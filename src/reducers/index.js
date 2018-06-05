import { combineReducers } from 'redux';
import { user } from './user';
import { recentEvents } from './recentEvents';
import { selectedEvent } from './selectedEvent';
import { suggestedRestaurants } from './suggestedRestaurants';
import { suggestedBars } from './suggestedBars';
import { locationError } from './locationError';
import { eventError } from './eventError';
import { filtersError } from './filtersError';
import { restaurantBarError } from './restaurantBarError';
import { barFilters } from './barFilters';
import { restaurantFilters } from './restaurantFilters';
import { location } from './location';


export const rootReducer = combineReducers({
  user,
  recentEvents, 
  selectedEvent,
  suggestedRestaurants,
  suggestedBars,
  locationError,
  eventError,
  filtersError,
  restaurantBarError,
  barFilters,
  restaurantFilters,
  location
});
