export const selectedEvent = (state = null, action) => {
  switch (action.type) {
    case 'STORE_SELECTED_EVENT':
      return action.event;
    default:
      return state;
  }
};