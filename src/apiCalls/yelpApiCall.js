import { yelpApiKey } from './apiKeys/yelpApiKey';
import * as cleaners from '../dataCleaners/index';
import { suggestedRestaurantsCleaner } from '../dataCleaners/suggestedRestaurantsCleaner';

export const yelpApiCall = async () => {
  let headers = new Headers();
  headers.append("Authorization", "Bearer " + yelpApiKey);

  const result = await fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972", {
    headers
  });
  const data = await result.json();
};

export const yelpFetchRestaurants = async (latitude, longitude, price, category) => {
  let headers = new Headers();
  headers.append("Authorization", "Bearer " + yelpApiKey);
  
  const result = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=${category}&latitude=${latitude}&longitude=${longitude}&price=${price}&radius=2500&sort_by=rating`, {
    headers
  });
  const data = await result.json();
  const restaurants = data.businesses;

  return suggestedRestaurantsCleaner(restaurants)
};