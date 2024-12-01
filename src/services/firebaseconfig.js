import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkK3ffzhy8yeCNySL3KL5FeQYRkfso2Js",
  authDomain: "clonist-2a046.firebaseapp.com",
  projectId: "clonist-2a046",
  storageBucket: "clonist-2a046.firebasestorage.app",
  messagingSenderId: "558509475982",
  appId: "1:558509475982:web:ec647c87c8a17364fda1df",
  measurementId: "G-EX9L5YCWRF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
