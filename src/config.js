import * as firebase from 'firebase';
import 'firebase/firestore';

// import "firebase/firestore";
// import * as firebase from 'firebase';
let config = {
  apiKey: "AIzaSyDmmZgH7bzF4E5tOwpqW_q1fZpwFeW63mE",
  authDomain: "veer-dd6b4.firebaseapp.com",
  databaseURL: "https://veer-dd6b4.firebaseio.com",
  projectId: "veer-dd6b4",
  storageBucket: "veer-dd6b4.appspot.com",
  messagingSenderId: "809156423304",
  appId: "1:809156423304:web:b76f5835c56e986adbf93d",
  measurementId: "G-F2ZPGGLHDE"
};

// Initialize firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
// let analytics = firebase.analytics();
export const db = firebase.firestore();
export const auth = firebase.auth();