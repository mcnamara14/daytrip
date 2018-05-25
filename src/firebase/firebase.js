import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBhhPB1euEwuA3tbCshgSZafio8mkU63Hc",
    authDomain: "daytrip-7d5c4.firebaseapp.com",
    databaseURL: "https://daytrip-7d5c4.firebaseio.com",
    projectId: "daytrip-7d5c4",
    storageBucket: "daytrip-7d5c4.appspot.com",
    messagingSenderId: "1096579022176",
  };

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth
};