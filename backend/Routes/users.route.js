const express = require("express");
const { userModel } = require("../Model/users.model.js");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../Middleware/auth.middlware.js");
const {
  getUser,
  getAllRegisteredUser,
  getUnfollowUser,
  getFollowUser,
  getUserFromSearch,
} = require("../Controller/user");
const userRoute = express.Router();

/* SEARCH USER USING NAME */
userRoute.post("/search", getUserFromSearch);
// userRoute.get("/search", verifyToken, getSearchUser);

/* GET ALL USERS */
userRoute.get("/allusers", verifyToken, getAllRegisteredUser);

/* GET SINGLE USER */
userRoute.get("/:id", verifyToken, getUser);

/* ADD FOLLOWERS */
userRoute.put("/follow", getFollowUser);

/* REMOVE FOLLOWERS */
userRoute.put("/unfollow", getUnfollowUser);
module.exports = {
  userRoute,
};
