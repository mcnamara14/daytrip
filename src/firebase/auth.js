import { auth } from './firebase';
import * as firebase from 'firebase';

// Email Sign Up
export const emailPasswordSignup = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Google Sign Up
export const googleSignup = () =>
auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())

// Facebook Sign Up
export const facebookSignup = () =>
auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())

  // Email Sign In
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
