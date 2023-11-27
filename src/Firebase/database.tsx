// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxLWrTDjpL7gIM3304FuzM-P_bTv-kiYk",
  authDomain: "testdb-64223.firebaseapp.com",
  projectId: "testdb-64223",
  storageBucket: "testdb-64223.appspot.com",
  messagingSenderId: "507281038977",
  appId: "1:507281038977:web:d380fe12c3c3a6efe97780"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);