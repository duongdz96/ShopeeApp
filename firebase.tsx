// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX2owup-3eln_LlsEFXtZa97krCNIEXmI",
  authDomain: "shopeeapp-d59f0.firebaseapp.com",
  projectId: "shopeeapp-d59f0",
  storageBucket: "shopeeapp-d59f0.appspot.com",
  messagingSenderId: "984112136525",
  appId: "1:984112136525:web:76a0b9be036b599ed33704",
  measurementId: "G-BR6QD36BKN"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
export { auth };

const analytics = getAnalytics(app);
