export const loginUser = (userId, email, city, state) => ({
  type: 'LOGIN_USER',
  userId,
  email,
  city,
  state
})