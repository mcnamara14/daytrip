export const recentEvents = (state = [], action) => {
  switch(action.type) {
    case 'STORE_RECENT_EVENTS':
      return [...action.recentEvents]
    default:
      return state
  }
}