import * as sapper from '@sapper/app';
import * as firebase from "firebase/app";

import "firebase/auth";

  var firebaseConfig = {
    apiKey: "AIzaSyB2FkBHlPKY47Vr_G7_NZnuZI8OE695lLI",
    authDomain: "test-ssr-40e59.firebaseapp.com",
    databaseURL: "https://test-ssr-40e59.firebaseio.com",
    projectId: "test-ssr-40e59",
    storageBucket: "test-ssr-40e59.appspot.com",
    messagingSenderId: "906090878464",
    appId: "1:906090878464:web:d88e41e5d91e133d902ae5"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

sapper.start({
	target: document.querySelector('#sapper')
});