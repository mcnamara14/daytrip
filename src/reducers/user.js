export const user = (state = {userId: null, email: '', location: ''}, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
      return {
        userId: action.userId,
        email: action.email,
        city: action.city,
        state: action.state
      }
    default:
      return state
  }
}