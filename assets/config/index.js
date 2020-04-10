// import firebase from 'firebase'
import * as firebase from 'firebase'
import 'firebase/firestore';

  let firebaseConfig = {
    apiKey: "apiKey",
    authDomain: "tauthDomain",
    databaseURL: "databaseURL",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId",
    appId: "appId"
  };
  // Initialize Firebase
  
let app = firebase.initializeApp(firebaseConfig)
//  firebase.initializeApp(firebaseConfig);
export const db = app.database()
