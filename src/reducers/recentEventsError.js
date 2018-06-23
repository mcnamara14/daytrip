export const recentEventsError = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_RECENT_EVENTS_ERROR':
      return action.boolean;
    default:
      return state;
  }
};