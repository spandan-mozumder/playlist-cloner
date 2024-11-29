import React from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/firebaseconfig";

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const user = auth.currentUser;
    if (user) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="w-[100%] h-[80px] flex justify-between items-center bg-[#efeee8]">
      <div className="mx-[30px]" onClick={handleClick}>
        <img src={logo} alt="logo" className="h-[60px] w-[60px] rounded-3xl" />
      </div>

      <div className="mx-[30px]">
        <Link to="/spotifytoyoutube">
          <button className="px-[20px] py-[1.5px] mx-[15px] text-[#5b5b5b] font-semibold border-b-2 border-[#efeee8] transition-all hover:border-[#5b5b5b] hover:scale-105">
            Spotify to Youtube
          </button>
        </Link>

        <Link to="/youtubetospotify">
          <button className="px-[20px] py-[1.5px] mx-[15px] text-[#5b5b5b] font-semibold border-b-2 border-[#efeee8] transition-all hover:border-[#5b5b5b] hover:scale-105">
            Youtube to Spotify
          </button>
        </Link>
      </div>

      <div className="mx-[30px]">
        <Link to="/signin">
          <button className="px-[20px] py-[2px] mx-[15px] rounded-md border-2 border-[#5b5b5b] bg-[#5b5b5b] text-[#efeee8] transition-all hover:bg-[#efeee8] hover:text-[#5b5b5b] shadow-lg shadow-[#b1b1b1]">
            Log In
          </button>
        </Link>

        <Link to="/signup">
          <button className="px-[20px] py-[2px] mx-[15px] rounded-md border-2 border-[#5b5b5b] text-[#5b5b5b] transition-all hover:bg-[#5b5b5b] hover:text-[#efeee8] shadow-lg shadow-[#b1b1b1]">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
