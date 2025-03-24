import React from 'react';
import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import { Toaster } from "react-hot-toast";
import { useAtom } from "jotai";
import { roleValue } from './components/Atom';

function App() {

  const [role] = useAtom(roleValue);
  return (
    <div>
      <Toaster />
    <Router>
      <Routes>
        <Route path="/" element={ role ? <Navigate to="/home" replace/> : <Login />} />
        <Route path="/home" element={role ? <Home /> : <Navigate to="/" replace /> } />
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
