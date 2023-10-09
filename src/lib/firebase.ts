import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_9jJC66BUq0YD5WK3SAq9xULxZH3Yvy4",
  authDomain: "web2-lab1-cadc8.firebaseapp.com",
  projectId: "web2-lab1-cadc8",
  storageBucket: "web2-lab1-cadc8.appspot.com",
  messagingSenderId: "246157628853",
  appId: "1:246157628853:web:7a350a501b1b351f5275fc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
