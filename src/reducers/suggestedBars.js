export const suggestedBars = (state = [], action) => {
  switch (action.type) {
    case 'STORE_SUGGESTED_BARS':
      return [...action.bars];
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};