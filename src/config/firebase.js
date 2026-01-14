// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBOjmmiGV7yoecC8udZlUuGYNsU218tIgM",
  authDomain: "notepad-e71f8.firebaseapp.com",
  projectId: "notepad-e71f8",
  storageBucket: "notepad-e71f8.firebasestorage.app",
  messagingSenderId: "600666374516",
  appId: "1:600666374516:web:1522d51670406464eeac21",
  measurementId: "G-P1X1TY0R4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const googleAuth=new GoogleAuthProvider();
export const db=getFirestore(app);