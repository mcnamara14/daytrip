export const filtersError = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_FILTERS_ERROR':
      return action.boolean;
    default:
      return state;
  }
}