import { ticketmasterApiKey } from './apiKeys/ticketmasterApiKey';
import { cleanRecentEventsSearch } from '../dataCleaners/recentEventsSearchCleaner';

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
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?startDateTime=${timeNow}&sort=date,name,asc&city=${city}&stateCode=${state}&${keyword}&apikey=${ticketmasterApiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const events = data._embedded.events;
    console.log(events)
    return cleanRecentEventsSearch(events)
  } catch (error) {
    alert(error);
  }
};







