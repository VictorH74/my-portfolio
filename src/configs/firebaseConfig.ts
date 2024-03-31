// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBL5iVTcxMZAMSpnXxQ6oVu7mU3O5O6iDo",
  authDomain: "vh-portfolio.firebaseapp.com",
  projectId: "vh-portfolio",
  storageBucket: "vh-portfolio.appspot.com",
  messagingSenderId: "862167795497",
  appId: "1:862167795497:web:4e8ebf99478fa4ed155938",
  measurementId: "G-1V4LVYXZGF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);

onAuthStateChanged(auth, user => {
  // Check for user status
});

export {db, auth}