import { auth } from './firebase';
import * as firebase from 'firebase';

export const emailPasswordSignup = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const googleSignup = () => {
  return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
};

// Facebook Sign Up
export const facebookSignup = () => {
  return auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
};

  // Email Sign In
export const emailPasswordSignin = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
}

// Sign out
export const signOut = () =>
  auth.signOut();

  // Password Reset
export const passwordReset = (email) =>
  auth.sendPasswordResetEmail(email);

// Password Change
export const updatePassword = (password) =>
  auth.currentUser.updatePassword(password);
