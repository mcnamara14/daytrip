import { ticketmasterApiKey } from './ticketmasterApiKey';

export const ticketmasterApiCall = async () => {
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?startDateTime=2018-05-25T16:47:00Z&endDateTime=2018-05-27T16:47:00Z&sort=date,name,asc&city=denver&stateCode=co&apikey=${ticketmasterApiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const events = data._embedded.events;

}





