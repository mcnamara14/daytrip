const moment = require('moment');

export const cleanRecentEvents = (events) => {
  let date;
  
  const allRecentEvents = events.map(event => {
    const {
      id,
      name,
      images,
      priceRanges,
      dates,
      _embedded
    } = event;

    const price = priceRanges ? '$' + priceRanges[0].min + '+' : 'Price TBD';
    const latitude = _embedded.venues[0].location.latitude;
    const longitude = _embedded.venues[0].location.longitude;

    if (!dates.start.dateTBA) {
      const standardTime = moment(dates.start.localTime, 'HH:mm')
        .format('h:mm A');
      date = dates.start.localDate + ' ' + standardTime ;
    } else {
      date = 'TBA';
    }


    return {
      id,
      title: name,
      image: images[0].url,
      price,
      venue: _embedded.venues[0].name,
      date,
      latitude,
      longitude
    };
  });

  const recentEvents = allRecentEvents.slice(0, 8);

  return recentEvents;
};

