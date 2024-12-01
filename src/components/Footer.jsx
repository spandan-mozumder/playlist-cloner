import React from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/firebaseconfig";
import linkedin from "../assets/linkedin.png";
import github from "../assets/github.png";
import instagram from "../assets/instagram.png";

const Footer = () => {
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
    <div className="flex flex-row justify-between items-center px-[50px] py-[30px] bg-[#efeee8]">
      <div onClick={handleClick}>
        <img src={logo} alt="logo" className="cursor-pointer h-[80px] w-[80px] rounded-3xl" />
      </div>

      <h3 className="text-xl bg-gradient-to-r to-[#93928d] from-gray-700 bg-clip-text text-transparent">
        Made with love by Spandan Mozumder
      </h3>

      <div className="flex flex-row gap-5">
        <Link to="https://www.linkedin.com/in/spandan-mozumder-88378233a/">
          <img src={linkedin} alt="linkedin" className="cursor-pointer transition-all hover:scale-105" />
        </Link>
        <Link to="https://github.com/spandan-mozumder">
          <img src={github} alt="github" className="cursor-pointer transition-all hover:scale-105" />
        </Link>
        <Link to="https://www.instagram.com/spandyzlost/">
          <img src={instagram} alt="instagram" className="cursor-pointer transition-all hover:scale-105" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
