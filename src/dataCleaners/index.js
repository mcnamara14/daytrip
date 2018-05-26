const moment = require('moment');

export const cleanRecentEvents = (events) => {
  let date;

  const recentEvents = events.map(event => {
    const {
      name,
      images,
      priceRanges,
      dates
    } = event;

    const price = priceRanges ? '$' + priceRanges[0].min + '+' : 'N/A';

    if (!dates.start.dateTBA) {
      const standardTime = moment(dates.start.localTime, 'HH:mm').format('h:mm A');
      date = dates.start.localDate + ' ' + standardTime ;
    } else {
      date = 'TBA';
    }

    return {
      title: name,
      image: images[0].url,
      price,
      date
    };
  });

  console.log(recentEvents)
  return recentEvents;
}

// :
// spanMultipleDays
// :
// false
// start
// :
// dateTBA
// :
// false
// dateTBD
// :
// false
// dateTime
// :
// "2018-05-26T03:00:00Z"
// localDate
// :
// "2018-05-25"
// localTime
// :
// "21:00:00"
// noSpecificTime
// :
// false
// timeTBA
// :
// false
// // 0
// :
// classifications
// :
// [{…}]
// dates
// :
// {start: {…}, timezone: "America/Denver", status: {…}, spanMultipleDays: false}
// id
// :
// "G5vzZfMQ6BZSO"
// images
// :
// Array(10)
// 0
// :
// {ratio: "16_9", url: "https://s1.ticketm.net/dam/a/375/606d24be-8ead-40aa-a622-22e5dfd02375_581101_RECOMENDATION_16_9.jpg", width: 100, height: 56, fallback: false}

// :
// Array(0)
// locale
// :
// "en-us"
// name
// :
// "Taylor Swift reputation Stadium Tour"
// pleaseNote
// :
// "American Express has set a two-order limit for this offer. This limit applies across all Cards associated with all of your American Express accounts. Prepaid cards are not eligible for this offer."
// priceRanges
// :
// Array(1)
// 0
// :
// {type: "standard", currency: "USD", min: 45.5, max: 595}
// length
// :
// 1
// __proto__
// :
// Array(0)
// products
// :
// [{…}]
// promoter
// :
// {id: "830", name: "AEG LIVE", description: "AEG LIVE / NTL / USA"}
// promoters
// :
// [{…}]
// sales
// :
// {public: {…}, presales: Array(4)}
// seatmap
// :
// {staticUrl: "https://s1.ticketm.net/tmimages/venue/maps/mtn/82513s.gif"}
// test
// :
// false
// type
// :
// "event"
// url
// :
// "https://www.ticketmaster.com/taylor-swift-reputation-stadium-tour-denver-colorado-05-25-2018/event/1E00537687E80CE0"
// _embedded
// :
// {venues: Array(1), attractions: Array(3)}
// _links
// :
// {self: {…}, attractions: Array(3), venues: Array(1)}