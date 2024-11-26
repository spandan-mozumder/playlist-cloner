import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Spotify from '../components/Spotify';
import Callback from '../components/Callback';
import Home from '../components/Home';
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Spotify />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/dashboard" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
