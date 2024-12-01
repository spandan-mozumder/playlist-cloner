import React, { useRef, useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import landing1 from "../assets/landing1.jpeg";
import landing2 from "../assets/landing2.jpeg";
import Footer from "./Footer";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebaseconfig";

const Landing = () => {
  const targetRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  const scrollToTarget = () => {
    window.scrollTo({
      top: targetRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-[#efeee8]">
      <div>
        <Navbar />
      </div>

      <div className="w-[100%] h-[500px] bg-[#efeee8] flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-7xl p-[25px] mt-[100px] bg-gradient-to-r from-[#959490] to-gray-700 bg-clip-text text-transparent">
            Clone Your Spotify and YouTube Playlists
          </h1>
          <h3 className="text-2xl p-[25px] bg-gradient-to-r to-[#959490] from-gray-700 bg-clip-text text-transparent">
            Easily transfer your favourite playlists between Spotify and YouTube
            with a few simple clicks
          </h3>
        </div>

        <div className="p-[20px]">
          <Link to="/signin">
            <button className="px-[20px] py-[4px] mx-[15px] rounded-full border-2 border-gray-600 bg-gray-600 text-[#efeee8] transition-all hover:bg-[#efeee8] hover:text-[#5b5b5b] shadow-md shadow-gray-300">
              Get Started
            </button>
          </Link>

          <button
            onClick={scrollToTarget}
            className="px-[20px] py-[4px] mx-[15px] rounded-full border-2 border-gray-700 text-gray-700 transition-all hover:bg-gray-700 hover:text-[#efeee8] shadow-md shadow-gray-300"
          >
            Learn More
          </button>
        </div>
      </div>

      <div className="bg-[#efeee8] flex flex-row" ref={targetRef}>
        <div className="w-[50%] p-[50px]">
          <img
            src={landing1}
            alt="landing1"
            className="w-[800px] h-[500px] rounded-3xl shadow-md shadow-[#b1b1b1]"
          />
        </div>

        <div className="w-[50%] p-[50px] flex flex-col justify-between">
          <div className="h-[200px] w-[3px] bg-gray-700 mx-[-20px] absolute"></div>

          <div className="p-[10px] h-[180px] flex flex-col justify-between">
            <h1 className="text-5xl h-[110px] bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent">
              Cross-Platform Playlist Cloning
            </h1>
            <h3 className="text-lg px-[30px]">
              Transfer Playlists between Spotify and Youtube effortlessly
            </h3>
          </div>

          <div className="p-[10px] h-[120px] flex flex-col justify-between">
            <h1 className="text-5xl h-[60px] bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent">
              One-Tap SignIn
            </h1>
            <h3 className="text-lg px-[30px]">
              Log into your respective accounts by a simple touch of a
              mouse-click
            </h3>
          </div>

          <div className="p-[10px] h-[120px] flex flex-col justify-between">
            <h1 className="text-5xl h-[60px] bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent">
              Seamless Playlist Transfer
            </h1>
            <h3 className="text-lg px-[30px]">
              Easy transfer of playlists between platforms
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-[#efeee8] flex flex-row">
        <div className="w-[50%] p-[50px] pl-[80px] flex flex-col justify-between">
          <div className="h-[200px] w-[3px] bg-gray-700 mx-[-20px] absolute"></div>

          <h1 className="text-5xl h-[110px] bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent p-[10px] mb-[20px]">
            Access The Service With Four Simple Steps
          </h1>

          <div className="p-[10px] flex flex-col justify-between gap-3">
            <h1 className="text-3xl bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent">
              Step 1:
            </h1>
            <h3 className="text-md px-[30px]">
              Create your account with us and log in with your credentials
            </h3>
          </div>

          <div className="p-[10px] flex flex-col justify-between gap-3">
            <h1 className="text-3xl bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent">
              Step 2:
            </h1>
            <h3 className="text-md px-[30px]">
              Click on the button which kind of cloning you would like to do -
              Spotify to YouTube or YouTube to Spotify
            </h3>
          </div>

          <div className="p-[10px] flex flex-col justify-between gap-3">
            <h1 className="text-3xl bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent">
              Step 3:
            </h1>
            <h3 className="text-md px-[30px]">
              Log into your respective Spotify and YouTube account
            </h3>
          </div>

          <div className="p-[10px] flex flex-col justify-between gap-3">
            <h1 className="text-3xl bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent">
              Step 4:
            </h1>
            <h3 className="text-md px-[30px]">
              Clone your playlist with one touch of a button - The playlist will
              be available in your library under a standard generated name.
            </h3>
          </div>
        </div>

        <div className="w-[50%] p-[50px] flex justify-center">
          <img
            src={landing2}
            alt="landing2"
            className="w-[600px] h-[600px] rounded-3xl shadow-md shadow-gray-300"
          />
        </div>
      </div>

      <div className="bg-[#efeee8] flex flex-row">
        <div className="my-[100px] mx-[180px] bg-[#ffddae] rounded-3xl w-full h-[300px]">
          <div className="w-[100%] h-[100%] rounded-3xl border-x-4 border-[#e8b86d] transition-all hover:border-x-8 hover:border-y-4 flex flex-col gap-10 justify-center items-center hover:shadow-lg">
            <div>
              <h1 className="text-3xl bg-gradient-to-r to-[#93928d] from-gray-700 bg-clip-text text-transparent h-[40px]">
                Sounds like a great service to you? Then what are you waiting
                for. Try Now!!
              </h1>
            </div>

            <div>
              <Link to="/spotifytoyoutube">
                <button className="px-[20px] py-[4px] mx-[15px] rounded-full border-2 border-gray-600 bg-gray-600 text-[#efeee8] transition-all hover:bg-transparent hover:text-[#5b5b5b] shadow-md shadow-[#b1b1b1]">
                  Spotify to Youtube
                </button>
              </Link>

              <Link to="/youtubetospotify">
                <button className="px-[20px] py-[4px] mx-[15px] rounded-full border-2 border-gray-600 text-gray-600 transition-all hover:bg-gray-600 hover:text-[#efeee8] shadow-md shadow-[#b1b1b1]">
                  Youtube to Spotify
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[2px] bg-[#cbcbc9] mx-[30px]"></div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
