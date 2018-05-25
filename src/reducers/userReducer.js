export const userReducer = (state = {userId: null, email: '', location: ''}, action) => {
  switch(action.type) {
    case 'STORE_USER':
      return {
        userId: action.userId,
        email: action.email,
        location: action.location
      }
    default:
      return state
  }
}