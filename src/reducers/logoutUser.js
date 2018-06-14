export const logoutUser = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_RESTAURANT_BAR_ERROR':
      return action.boolean;
    default:
      return state;
  }
};