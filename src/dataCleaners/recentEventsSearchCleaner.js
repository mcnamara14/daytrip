export const cleanRecentEventsSearch = (events) => {
  const eventsSearchResults = events.map((event, index) => {
    const {
      id,
      name,
      _embedded
    } = event;

    const venue = _embedded.venues[0].name;

    return {
      value: index,
      label: name + venue,
      id
    };
  });

  return {options: eventsSearchResults};
};