import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import LogoutFallBack from './components/LogoutFallBack';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster />
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/logoutfallback" element={<LogoutFallBack />} />
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
