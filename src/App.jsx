import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import SpotifytoYoutube from "./components/SpotifytoYoutube";
import Callback from "./components/Callback";
import YouTubetoSpotify from "./components/YoutubetoSpotify";
import Dashboard from "./components/Dashboard";
import NotAuthenticated from "./components/NotAuthenticated";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/spotifytoyoutube" element={<SpotifytoYoutube />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/youtubetospotify" element={<YouTubetoSpotify />} />
        <Route path="/notauthenticated" element={<NotAuthenticated />} />
      </Routes>
    </Router>
  );
};

export default App;
