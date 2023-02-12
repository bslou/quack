// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_fma2GmLQ3zlcFZ22MQ0mNaVxeJivFJo",
  authDomain: "quack-ea88d.firebaseapp.com",
  projectId: "quack-ea88d",
  storageBucket: "quack-ea88d.appspot.com",
  messagingSenderId: "973230183199",
  appId: "1:973230183199:web:d473971815287c3e50962a",
  measurementId: "G-DPVFSW0BMR",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, db, storage };
