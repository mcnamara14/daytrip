export const locationError = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_LOCATION_ERROR':
      return action.boolean;
    default:
      return state;
  }
};