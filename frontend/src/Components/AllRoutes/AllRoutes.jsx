import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../../AllPages/Login/Login";
import Home from "../../AllPages/Home/Home";
import ProfilePage from "../../AllPages/ProfilePage/ProfilePage";
import Register from "../../AllPages/Register/Register";
import { useSelector } from "react-redux";
import SinglePostPage from "../../AllPages/Home/SinglePostPage/SinglePostPage";
const AllRoutes = () => {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={isAuth ? <Home /> : <Navigate to={"/"} />}
        />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:postId" element={<SinglePostPage />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
