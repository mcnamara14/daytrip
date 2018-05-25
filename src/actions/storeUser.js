export const storeUser = (userId, email, location) => ({
  type: 'STORE_USER',
  userId,
  email,
  location
})