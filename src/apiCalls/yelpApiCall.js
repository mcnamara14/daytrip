import { yelpApiKey } from './apiKeys/yelpApiKey';

export const yelpApiCall = async (locationLat, locationLong) => {
  let headers = new Headers();
  headers.append("Authorization", "Bearer " + yelpApiKey);

  const result = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?&categories=beerbar,hotel_bar,irish_pubs,lounges,pubs,speakeasies,sportsbars,whiskeybars&latitude=${locationLat}&longitude=${locationLong}&radius=1000&price=1&sort_by=rating`, {
    headers
  });
  const data = await result.json();

  console.log(data)
};