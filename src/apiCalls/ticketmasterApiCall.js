import { ticketmasterApiKey } from './apiKeys/ticketmasterApiKey';
import { cleanRecentEventsSearch, cleanRecentEvents } from '../dataCleaners/index';

export const ticketmasterApiCallRecentEvents = async (city, state, timeNow) => {
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?startDateTime=${timeNow}&sort=date,name,asc&city=${city}&stateCode=${state}&apikey=${ticketmasterApiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const events = data._embedded.events;
    console.log(events)
    return events;
  } catch (error) {
    alert(error);
  }
};

export const ticketmasterApiCallRecentEventsSearch = async (city, state, timeNow, keyword) => {
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?startDateTime=${timeNow}&sort=date,name,asc&city=${city}&stateCode=${state}&keyword=${keyword}&apikey=${ticketmasterApiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const events = data._embedded.events;
  console.log(events)
  return cleanRecentEventsSearch(events)
};

export const ticketmasterFetchSelectedEvent = async (id) => {
  const url = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${ticketmasterApiKey}`;

  try {
    const response = await fetch(url);
    const event = await response.json();

    return cleanRecentEvents([event])
  } catch (error) {
    alert(error);
  }
};










