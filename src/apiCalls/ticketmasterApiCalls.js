import { ticketmasterApiKey } from './apiKeys/ticketmasterApiKey';
import { 
  cleanRecentEventsSearch, 
  cleanRecentEvents 
} from '../dataCleaners/index';

export const fetchRecentEvents = async (city, state, timeNow) => {
  const prefix = 'https://app.ticketmaster.com/discovery/v2/events.json?';
  const start = `startDateTime=${timeNow}`;
  const sort = 'sort=date,name,asc';
  const userCity = `city=${city}`;
  const userState = `stateCode=${state}`;
  const apiKey = `apikey=${ticketmasterApiKey}`;

  const url = `${prefix}&${start}&${sort}&${userCity}&${userState}&${apiKey}`;

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

export const fetchRecentEventsOnSearch = async (
  userCity, 
  userState, 
  timeNow, 
  keyword) => {
  const prefix = 'https://app.ticketmaster.com/discovery/v2/events.json?';
  const start = `startDateTime=${timeNow}`;
  const sort = 'sort=date,name,asc';
  const city = `city=${userCity}`;
  const state = `stateCode=${userState}`;
  const input = `keyword=${keyword}`;
  const key = `apikey=${ticketmasterApiKey}`;

  const url = `${prefix}${start}&${sort}&${city}&${state}&${input}&${key}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const events = data._embedded.events;
  
    return cleanRecentEventsSearch(events);
  } catch (error) {
    console.log(error)
  }

};

export const fetchSelectedEvent = async (id) => {
  const prefix = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?`;
  const url = `${prefix}apikey=${ticketmasterApiKey}`;

  try {
    const response = await fetch(url);
    const event = await response.json();
    
    return cleanRecentEvents([event]);
  } catch (error) {
    console.log('error');
  }
};










