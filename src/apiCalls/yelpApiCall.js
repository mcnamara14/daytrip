import { yelpApiKey } from './apiKeys/yelpApiKey';

export const yelpApiCall = async () => {
  let headers = new Headers();
  headers.append("Authorization", "Bearer " + yelpApiKey);

  const result = await fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972", {
    headers
  });
  const data = await result.json();
};