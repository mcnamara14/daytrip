const moment = require('moment');

export const cleanRecentEventsSearch = (events) => {
  const eventsSearchResults = events.map((event, index) => {
    return {
      value: index,
      label: event.name,
      id: event.id
    }
  })

  return {options: eventsSearchResults}
};