export const location = (state = null, action) => {
  switch (action.type) {
    case 'TOGGLE_LOCATION':
      return {
        city: action.city,
        state: action.state
      }
    default:
      return state;
  }
}