import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn"
import SpotifytoYoutube from "./components/SpotifytoYoutube";
import YouTubetoSpotify from "./components/YoutubetoSpotify";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/spotifytoyoutube" element={<SpotifytoYoutube />} />
        <Route path="/youtubetospotify" element={<YouTubetoSpotify />} />
      </Routes>
    </Router>
  );
};

export default App;
