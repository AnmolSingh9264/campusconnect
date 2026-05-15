//import React, { useState } from 'react';
//import challengeIcon from "@/assets/ic_challenges.png";
import Login from "./Pages/Login";
import Landing from "./Pages/Landing";
import Signup1 from "./Pages/SignUP1";
import Signup2 from "./Pages/SignUP2";
import Signup3 from "./Pages/SignUP3";
import Dashboard from "./Pages/Dashboard";
import UpdatePassword from "./Pages/UpdatePassword.tsx";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Context/AuthContext.tsx";
import EditProfile from "./Pages/EditProfile.tsx";
import { OnboardingProvider } from "./Context/OnboardingContext.tsx";

export default function App() {
  return (
    <Routes>
      {/* open landing page */}
      <Route path="/" element={<Landing />} />

      <Route path="/updatepassword" element={<UpdatePassword />} />

      <Route element={<GuestGuard />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup1" element={<Signup1 />} />
        <Route path="/signup2" element={<Signup2 />} />
        <Route path="/signup3" element={<Signup3 />} />
      </Route>

      <Route element={<CheckAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/editprofile"
          element={
            <OnboardingProvider>
              <EditProfile />
            </OnboardingProvider>
          }
        />
      </Route>
    </Routes>
  );
}
export function CheckAuth() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export function GuestGuard() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
