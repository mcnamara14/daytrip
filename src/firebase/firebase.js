import * as firebase from 'firebase';
import { firebaseApiKey } from './apiKey';

const config = {
  apiKey: firebaseApiKey,
  authDomain: "daytrip-c5c3a.firebaseapp.com",
  databaseURL: "https://daytrip-c5c3a.firebaseio.com",
  projectId: "daytrip-c5c3a",
  storageBucket: "daytrip-c5c3a.appspot.com",
  messagingSenderId: "532630776936",
  };

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth
};