import { yelpApiKey } from './apiKeys/yelpApiKey';
import { 
  suggestedRestaurantsCleaner 
} from '../dataCleaners/suggestedRestaurantsCleaner';

export const fetchRestaurantsAndBars = async (
  latitude, 
  longitude, 
  price, 
  category) => {

  const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/'
  const prefix = `${corsAnywhereUrl}https://api.yelp.com/v3/businesses/search?`;
  const cat = `categories=${category}`;
  const lat = `latitude=${latitude}`;
  const long = `longitude=${longitude}`;
  const cost = `price=${price}`;
  const radius = `radius=2500`;
  const sort = 'sort_by=rating';

  let headers = new Headers();
  headers.append("Authorization", "Bearer " + yelpApiKey);
  
  const result = 
    await fetch(`${prefix}${cat}&${lat}&${long}&${cost}&${radius}&${sort}`, 
      {
        headers
      });
  const data = await result.json();
  const restaurants = data.businesses;
  
  return suggestedRestaurantsCleaner(restaurants);
};