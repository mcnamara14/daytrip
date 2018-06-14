export const barFilters = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_BAR_CATEGORY':
      return {...state, category: action.category};
    case 'STORE_BAR_PRICE':
      return {...state, price: action.price};
    default:
      return state;
  }
};