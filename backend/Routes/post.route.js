const express = require("express");
const { verifyToken } = require("../Middleware/auth.middlware.js");
const {
  getAllFeedPosts,
  getUserPosts,
  likePost,
} = require("../Controller/posts");
const { postModel } = require("../Model/posts.model.js");
const postsRoute = express.Router();

/* READ */
postsRoute.get("/", verifyToken, getAllFeedPosts);

/* Get single user POST*/
postsRoute.get("/profile/:userId", verifyToken, getUserPosts);
// postsRoute.get("profile", getUserPosts);

// postsRoute.get("/singleuser", verifyToken, getUserPosts);

// /* UPDATE */
postsRoute.patch("/:id/like", verifyToken, likePost);
module.exports = {
  postsRoute,
};
