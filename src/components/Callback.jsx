import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebaseconfig";
import { doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Callback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.replace("#", "?")).get("access_token");

    if (token) {
      // Listen for auth state changes
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = doc(db, "users", user.uid);
          
          try {
            await setDoc(userRef, { spotifyToken: token }, { merge: true });
            console.log("Spotify token stored successfully in Firestore.");
            setLoading(false);
            navigate("/dashboard");
          } catch (error) {
            console.error("Error storing token in Firestore:", error);
            setLoading(false);
          }
        } else {
          console.error("User not authenticated.");
          setLoading(false);
        }
      });
      return () => unsubscribe();
    } else {
      console.error("No access token found.");
      setLoading(false);
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
