export const location = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_LOCATION':
      return action.boolean;
    default:
      return state;
  }
}