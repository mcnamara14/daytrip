import { auth } from './firebase';

// Sign Up
export const emailPasswordSignup = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

  // Sign In
export const emailPasswordSignin = (email, password) =>
auth.signInWithEmailAndPassword(email, password);

// Sign out
export const signOut = () =>
  auth.signOut();

  // Password Reset
export const passwordReset = (email) =>
  auth.sendPasswordResetEmail(email);

// Password Change
export const updatePassword = (password) =>
  auth.currentUser.updatePassword(password);