import { yelpApiKey } from './apiKeys/yelpApiKey';
import * as cleaners from '../dataCleaners/index';

export const yelpApiCall = async () => {
  let headers = new Headers();
  headers.append("Authorization", "Bearer " + yelpApiKey);

  const result = await fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972", {
    headers
  });
  const data = await result.json();
};

export const fetchYelpCategories = async (keyword) => {
  console.log('asdf')
  let headers = new Headers();
  const corsUrl = 'https://cors-anywhere.herokuapp.com/'
  const yelpUrl = `https://api.yelp.com/v3/autocomplete?text=${keyword}&latitude=37.786882&longitude=-122.399972`
  const url = corsUrl + yelpUrl;

  headers.append("Authorization", "Bearer " + yelpApiKey);

  const result = await fetch(url, {
    headers
  });
  const data = await result.json();
  
  return cleaners.beforeEventCategoryCleaner(data)
}