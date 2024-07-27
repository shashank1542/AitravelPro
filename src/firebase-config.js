// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD28fK-QAQyt_1ZI8HeECtCiKwt49baYcQ",
  authDomain: "aitravelpro-e5964.firebaseapp.com",
  projectId: "aitravelpro-e5964",
  storageBucket: "aitravelpro-e5964.appspot.com",
  messagingSenderId: "593488457068",
  appId: "1:593488457068:web:3e451fd5ba7cb04ca29749",
  measurementId: "G-YKRQFQBPL6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };