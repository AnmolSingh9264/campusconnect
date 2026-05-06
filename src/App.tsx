//import React, { useState } from 'react';
//import challengeIcon from "@/assets/ic_challenges.png"; 
import Login from "./Pages/Login";
import Landing from "./Pages/Landing";
import Signup1 from "./Pages/SignUP1";
import Signup2 from "./Pages/SignUP2";
import Signup3 from "./Pages/SignUP3";
import Dashboard from './Pages/Dashboard';
import { Routes, Route } from "react-router-dom";

export default function App() {
 return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup1" element={<Signup1/>} />
      <Route path="/signup2" element={<Signup2/>} />
      <Route path="/signup3" element={<Signup3/>} />
    </Routes>
  );
}
