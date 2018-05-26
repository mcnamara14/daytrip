import { ticketmasterApiKey } from './apiKeys/ticketmasterApiKey';

export const ticketmasterApiCallRecentEvents = async (city, state, timeNow, timeIn2Days) => {
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?startDateTime=${timeNow}&endDateTime=${timeIn2Days}&sort=date,name,asc&city=${city}&stateCode=${state}&apikey=${ticketmasterApiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const events = data._embedded.events;

    return events
  } catch (error) {
      alert(error)
  }
}





