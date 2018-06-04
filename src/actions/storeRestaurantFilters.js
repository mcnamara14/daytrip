export const storeRestaurantFilters = (category, priceRanges) => ({
  type: 'STORE_RESTAURANT_FILTERS',
  category,
  priceRanges
});