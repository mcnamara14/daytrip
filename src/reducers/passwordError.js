export const passwordError = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_PASSWORD_ERROR':
      return action.boolean;
    default:
      return state;
  }
};