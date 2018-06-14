export const suggestedRestaurants = (state = [], action) => {
  switch (action.type) {
    case 'STORE_SUGGESTED_RESTAURANTS':
      return [...action.restaurants];
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};