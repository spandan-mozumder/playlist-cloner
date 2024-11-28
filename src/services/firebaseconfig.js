import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence, browserLocalPersistence
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpfZAM_LJ84FoOLUmWPxKNoGBWGDekoco",
  authDomain: "playlistcloner-7c290.firebaseapp.com",
  projectId: "playlistcloner-7c290",
  storageBucket: "playlistcloner-7c290.appspot.com",
  messagingSenderId: "450564134397",
  appId: "1:450564134397:web:bb71e0b36ddde34eb6b594",
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
