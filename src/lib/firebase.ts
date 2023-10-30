import { initializeApp, getApps, deleteApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_9jJC66BUq0YD5WK3SAq9xULxZH3Yvy4",
  authDomain: "web2-lab1-cadc8.firebaseapp.com",
  projectId: "web2-lab1-cadc8",
  storageBucket: "web2-lab1-cadc8.appspot.com",
  messagingSenderId: "246157628853",
  appId: "1:246157628853:web:7a350a501b1b351f5275fc"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
  deleteApp(app);
  app = initializeApp(firebaseConfig);
}

export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
