const moment = require('moment');

export const cleanRecentEventsSearch = (events) => {
  let date; 

  const eventsSearchResults = events.map((event, index) => {
    const {
      id,
      name,
      _embedded,
      dates
    } = event;

    const venue = _embedded.venues[0].name;

    if (!dates.start.dateTBA) {
      const standardTime = moment(dates.start.localTime, 'HH:mm')
        .format('h:mm A');
      date = dates.start.localDate + ' ' + standardTime ;
    } else {
      date = 'TBA';
    }

    return {
      value: index,
      label: name + ' ' + venue + ' ' + date,
      id
    };
  });

  return {options: eventsSearchResults};
};