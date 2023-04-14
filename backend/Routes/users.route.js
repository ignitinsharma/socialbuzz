const express = require("express");
const { userModel } = require("../Model/users.model.js");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../Middleware/auth.middlware.js");
const {
  getUser,
  addRemoveFriend,
  getUserFriends,
} = require("../Controller/user");
const userRoute = express.Router();

/* READ */
userRoute.get("/:id", verifyToken, getUser);
// userRoute.get("/:id", getUser);
userRoute.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
userRoute.patch("/:id/:friendId", verifyToken, addRemoveFriend);
module.exports = {
  userRoute,
};
