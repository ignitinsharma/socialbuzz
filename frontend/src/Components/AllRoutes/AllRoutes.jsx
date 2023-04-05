import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../../AllPages/Login/Login";
import Home from "../../AllPages/Home/Home";
import ProfilePage from "../../AllPages/ProfilePage/ProfilePage";
import Register from "../../AllPages/Register/Register";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
