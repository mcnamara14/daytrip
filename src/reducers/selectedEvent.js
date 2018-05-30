export const selectedEvent = (state = [], action) => {
  switch (action.type) {
    case 'STORE_SELECTED_EVENT':
      return [...action.event];
    default:
      return state;
  }
};