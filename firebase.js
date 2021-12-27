import * as firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCd00C-lLu_EswFZM9mfmIhgGddMRxA93o",
    authDomain: "chatloop-423be.firebaseapp.com",
    projectId: "chatloop-423be",
    storageBucket: "chatloop-423be.appspot.com",
    messagingSenderId: "601671786444",
    appId: "1:601671786444:web:6648978e266f0074a30769"
  };

  let app;

  
  if(firebase.apps.length === 0){
      app = firebase.initializeApp(firebaseConfig)
  } else{
      app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export {db, auth};