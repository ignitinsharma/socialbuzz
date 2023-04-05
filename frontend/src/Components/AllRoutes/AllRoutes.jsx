import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "../../AllPages/Login/Login";
import Home from "../../AllPages/Home/Home";
import ProfilePage from "../../AllPages/ProfilePage/ProfilePage";
import Register from "../../AllPages/Register/Register";
import { useSelector } from "react-redux";
const AllRoutes = () => {
  // const navigate = useNavigate();
  const isAuth = useSelector((store) => store.token);
  console.log("isAuth:", isAuth);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* Private route */}
        {/* <Route
          path="/home"
          element={isAuth ? <Home /> : <Navigate to={"/"} />}
        /> */}
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
