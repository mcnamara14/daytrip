const moment = require('moment');

export const cleanRecentEvents = (events) => {
  let date;

  const allRecentEvents = events.map(event => {
    const {
      name,
      images,
      priceRanges,
      dates,
      _embedded
    } = event;

    const price = priceRanges ? '$' + priceRanges[0].min + '+' : 'N/A';

    if (!dates.start.dateTBA) {
      const standardTime = moment(dates.start.localTime, 'HH:mm')
        .format('h:mm A');
      date = dates.start.localDate + ' ' + standardTime ;
    } else {
      date = 'TBA';
    }

    return {
      title: name,
      image: images[0].url,
      price,
      venue: _embedded.venues[0].name,
      locationLat: _embedded.venues[0].location.latitude,
      locationLong: _embedded.venues[0].location.longitude,
      date
    };
  });

  const recentEvents = allRecentEvents.slice(0, 8);

  return recentEvents;
};