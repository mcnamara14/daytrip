import * as firebase from 'firebase';

const config = {

  };

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth
};