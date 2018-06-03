export const mockCleanRecentEvents = {
  events: [
    {
      title: "T Swift",
      image: "https://s1.ticketm.allswifty.jpg",
      price: "$300+",
      venue: "Boulder Theater",
      date: "2018-05-30 2018-05-27T17:13:38-06:00",
      id: 'Zrt9dk32l',
      latitude: "39.735001",
      longitude: "-105.020401"
    }
  ]
};

export const mockCleanRecentEventsNoStartNoPrice = {
  events: [
    {
      title: "T Swift",
      image: "https://s1.ticketm.allswifty.jpg",
      price: "$300+",
      venue: "Boulder Theater",
      date: "TBA",
      id: 'Zrt9dk32l',
      latitude: "39.735001",
      longitude: "-105.020401"
    }
  ]
};

export const mockDirtyRecentEvents = {
  events: [
    {
      classifications: [{test: '...'}],
      dates: { 
        start: {
          localDate: "2018-05-30",
          localTime: "08:00:00"
        }
      },
      id: "Zrt9dk32l",
      images: [{
        url: "https://s1.ticketm.allswifty.jpg"
      }],
      priceRanges: [{
        currency: "USD",
        max: 12,
        min: 300
      }],
      name: "T Swift",
      sales:{public: {test: '...'}},
      type: "event",
      url: "http://www.ticketsnow.com/PID=2107079",
      _embedded:{
        venues: [{
          location: {
            latitude: "39.735001",
            longitude: "-105.020401"
          },
          name: "Boulder Theater"
        }]
      }
    }
  ]
}

export const mockDirtyRecentEventsNoStartNoPrice = {
  events: [
    {
      classifications: [{test: '...'}],
      dates: { 
        start: {
          dateTBA: true
        }
      },
      id: "Zrt9dk32l",
      images: [{
        url: "https://s1.ticketm.allswifty.jpg"
      }],
      priceRanges: [{
        currency: "USD",
        max: 12,
        min: 300
      }],
      name: "T Swift",
      sales:{public: {test: '...'}},
      type: "event",
      url: "http://www.ticketsnow.com/PID=2107079",
      _embedded:{
        venues: [{
          location: {
            latitude: "39.735001",
            longitude: "-105.020401"
          },
          name: "Boulder Theater"
        }]
      }
    }
  ]
}