export const restaurantBarLoading = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_RESTAURANT_BAR_LOADING':
      return action.boolean;
    default:
      return state;
  }
};