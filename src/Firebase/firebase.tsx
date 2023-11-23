// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnd0dFePkkToXCPusconMQ1h5ah8zYvhQ",
  authDomain: "shopeeapp-b5134.firebaseapp.com",
  projectId: "shopeeapp-b5134",
  storageBucket: "shopeeapp-b5134.appspot.com",
  messagingSenderId: "564057098276",
  appId: "1:564057098276:web:61f8420cd6bb074c0e70b1"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)