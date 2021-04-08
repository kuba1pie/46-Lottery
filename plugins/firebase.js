import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuuUZ3sQT7Zur6Y65jdH2LRjh3aKnkLHk",
  authDomain: "mallpromo-361f1.firebaseapp.com",
  databaseURL:
    "https://mallpromo-361f1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mallpromo-361f1",
  storageBucket: "mallpromo-361f1.appspot.com",
  messagingSenderId: "972443781449",
  appId: "1:972443781449:web:e43754560dce71abea7298",
  measurementId: "G-H9L9MXPLXE",
};
// Initialize Firebase
// eslint-disable-next-line no-unused-expressions
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : "";

export const auth = firebase.auth();
export const db = firebase.firestore();
export default [firebase, db];
