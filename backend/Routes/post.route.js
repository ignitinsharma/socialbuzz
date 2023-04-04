const express = require("express");
const { verifyToken } = require("../Middleware/auth.middlware.js");
const {
  getAllFeedPosts,
  getUserPosts,
  likePost,
} = require("../Controller/posts");
const postsRoute = express.Router();

/* READ */
postsRoute.get("/", verifyToken, getAllFeedPosts);
postsRoute.get("/:userId/posts", verifyToken, getUserPosts);

// /* UPDATE */
postsRoute.patch("/:id/like", verifyToken, likePost);
module.exports = {
  postsRoute,
};
