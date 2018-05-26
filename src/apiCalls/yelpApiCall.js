import { yelpApiKey } from './apiKeys/yelpApiKey';

export const yelpApiCall = () => {
  let headers = new Headers();
  headers.append("Authorization", "Bearer " + yelpApiKey);

  fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972", {
    headers
  }).then((res) => {
    return res.json();
  }).then((json) => {
    console.log(json);
  });
};