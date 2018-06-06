export const barFilters = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_BAR_FILTERS':
      return {
        category: action.category,
        priceRange: action.priceRanges
      };
    default:
      return state;
  }
};