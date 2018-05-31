export const suggestedRestaurants = (state = [], action) => {
  switch (action.type) {
    case 'STORE_SUGGESTED_RESTAURANTS':
      return [...action.restaurants];
    default:
      return state;
  }
}