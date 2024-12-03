import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../services/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection, query, where } from "firebase/firestore";

const Dashboard = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = user.email;
        console.log(email);

        const usersCollection = collection(db, "users");

        const q = query(usersCollection, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const { name } = userDoc.data();
          console.log("User's Name:", name);
          setUserName(name);
          return name;
        } else {
          console.log("No user found with the given email.");
          return null;
        }
      } else {
        navigate("/notauthenticated");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  return (
    <div className="flex">
      <div className="w-[50%] p-[30px] h-[100vh] flex flex-col justify-center items-center gap-10">
        <h2 className="text-4xl bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent h-[50px]">
          Hello{" "}
          <span className="bg-gradient-to-r from-[#ffddae] to-gray-700 bg-clip-text text-transparent">
            {userName}
          </span>
        </h2>

        <h2 className="text-4xl bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent h-[50px]">
          Welcome to your Dashboard
        </h2>

        <h2 className="text-lg bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent h-[50px] text-center">
          I refer to this page as a dashboard but this is really
          minimalistically minimalist
        </h2>
      </div>

      <div className="w-[50%] p-[80px] flex flex-col justify-center items-center gap-10">
        <div className="border-4 border-gray-700 w-full h-full rounded-3xl flex flex-col justify-center items-center gap-[50px]">
          <Link to="/spotifytoyoutube">
            <button className="px-[30px] py-[10px] mx-[15px] text-3xl rounded-xl text-gray-700 transition-all hover:shadow-md hover:shadow-[#b1b1b1] hover:border-2 hover:border-gray-100 hover:bg-gray-100">
              Spotify to Youtube
            </button>
          </Link>

          <Link to="/youtubetospotify">
            <button className="px-[30px] py-[10px] mx-[15px] text-3xl rounded-xl text-gray-700 transition-all hover:shadow-md hover:shadow-[#b1b1b1] hover:border-2 hover:border-gray-100 hover:bg-gray-100">
              Youtube to Spotify
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
