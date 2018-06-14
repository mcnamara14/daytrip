export const restaurantFilters = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_RESTAURANT_CATEGORY':
      return {...state, category: action.category};
    case 'STORE_RESTAURANT_PRICE':
      return {...state, price: action.price};
    default:
      return state;
  }
};