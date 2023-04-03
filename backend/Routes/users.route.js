const express = require("express");
const { userModel } = require("../Model/users.model");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../Middleware/auth.middlware");
const userRoute = express.Router();

/* READ */
// userRoute.get("/:id", verifyToken, getUser);
// userRoute.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
// userRoute.patch("/:id/:friendId", verifyToken, addRemoveFriend);
module.exports = {
  userRoute,
};
