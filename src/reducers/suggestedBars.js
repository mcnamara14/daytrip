export const suggestedBars = (state = [], action) => {
  switch (action.type) {
    case 'STORE_SUGGESTED_BARS':
      return [...action.bars];
    default:
      return state;
  }
}