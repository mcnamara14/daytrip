import { yelpApiKey } from './apiKeys/yelpApiKey';

export const yelpApiCall = async (locationLat, locationLong) => {
  let headers = new Headers();
  headers.append("Authorization", "Bearer " + yelpApiKey);

  const result = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?&latitude=${locationLat}&longitude=${locationLong}`, {
    headers
  });
  const data = await result.json();

  console.log(data)
};