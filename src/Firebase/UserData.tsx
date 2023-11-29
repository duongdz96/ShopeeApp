// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2wYGkapx8WG8l_snFPLZHLLlmGaJ0Bco",
  authDomain: "database-503ac.firebaseapp.com",
  projectId: "database-503ac",
  storageBucket: "database-503ac.appspot.com",
  messagingSenderId: "501143100467",
  appId: "1:501143100467:web:c9fd8288c4f61c56efd746"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);