import { auth } from './firebase';
import * as firebase from 'firebase';

export const emailPasswordSignup = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const googleSignup = () => {
  return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
};

export const facebookSignup = () => {
  return auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
};

export const emailPasswordSignin = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const signOut = () =>
  auth.signOut();

export const passwordReset = (email) =>
  auth.sendPasswordResetEmail(email);

export const updatePassword = (password) =>
  auth.currentUser.updatePassword(password);
