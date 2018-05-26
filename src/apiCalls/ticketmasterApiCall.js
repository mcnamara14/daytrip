import { ticketmasterApiKey } from './ticketmasterApiKey';
var moment = require('moment');

export const ticketmasterApiCallRecentEvents = async (city, state) => {
  const date = moment();
  const currentDate = date.format()
  const addTwoDays = date.clone().add(2, 'day');
  const twoDaysLater = addTwoDays.format();

  const url = `https://app.ticketmaster.com/discovery/v2/events.json?startDateTime=${currentDate}&endDateTime=${twoDaysLater}&sort=date,name,asc&city=${city}&stateCode=${state}&apikey=${ticketmasterApiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const events = data._embedded.events;
  console.log(events)
}





