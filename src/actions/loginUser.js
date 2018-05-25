export const loginUser = (userId, email, location) => ({
  type: 'LOGIN_USER',
  userId,
  email,
  location
})