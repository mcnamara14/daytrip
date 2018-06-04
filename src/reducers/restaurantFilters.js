export const restaurantFilters = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_RESTAURANT_FILTERS':
      return {
        category: action.category,
        priceRange: action.priceRanges
      }
    default:
      return state;
  }
}