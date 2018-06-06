export const eventError = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_EVENT_ERROR':
      return action.boolean;
    default:
      return state;
  }
};