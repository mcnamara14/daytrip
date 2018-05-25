export const userReducer = (state = {userLocation: '', userName: ''}, action) => {
  switch(action.type) {
    case 'STORE_USER_LOCATION':
      return state.userLocation = action.userLocation;
    default:
      return state
  }
}