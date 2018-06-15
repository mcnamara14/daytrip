const moment = require('moment');

export const cleanRecentEvents = (events) => {
  let time;
  let date;
  let price;
  
  const allRecentEvents = events.map(event => {
    const {
      id,
      name,
      images,
      priceRanges,
      dates,
      _embedded,
      url
    } = event;
    console.log(name)
    if (name === 'The Book of Mormon') {
      price = '$163+';
    } else {
      price = priceRanges ? '$' + priceRanges[0].min + '+' : 'Price TBD';

    }

    if (_embedded.venues[0].location && _embedded.venues[0].location) {
      const latitude = _embedded.venues[0].location.latitude;
      const longitude = _embedded.venues[0].location.longitude;
    
      if (!dates.start.dateTBA) {
        time = moment(dates.start.localTime, 'HH:mm')
          .format('h:mm A');
        date = moment(dates.start.localDate, 'Y/M/D').format('dddd, MMMM D, Y');
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
        time,
        latitude,
        longitude,
        url
      };
    } else {
      return null;
    }
  });

  const recentEvents = allRecentEvents.slice(0, 8);

  return recentEvents;
};

