import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence, browserLocalPersistence
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

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

async function signUpUser(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
    });

    console.log("User signed up and details saved:", user.uid);
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
}

async function signInUser(email, password) {
  try {
    await setPersistence(auth, browserLocalPersistence);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const docSnap = await getDoc(doc(db, "users", user.uid));

    if (docSnap.exists()) {
      const userData = docSnap.data();
      console.log("User logged in:", userData);
      displayUserDetails(userData);
      window.location.href = "/";
    } else {
      console.error("No user data found in Firestore");
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
  }
}

function displayUserDetails(userData) {
  console.log(`Welcome ${userData.name}`);
  console.log(`Email: ${userData.email}`);
}

export { app, auth, db, signUpUser, signInUser, displayUserDetails };
