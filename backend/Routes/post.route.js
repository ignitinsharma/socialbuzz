const express = require("express");
const { verifyToken } = require("../Middleware/auth.middlware.js");
const {
  getAllFeedPosts,
  getUserPosts,
  likePost,
  DislikePost,
  // DislikePost,
} = require("../Controller/posts");
const { postModel } = require("../Model/posts.model.js");
const postsRoute = express.Router();

/* READ */
postsRoute.get("/", verifyToken, getAllFeedPosts);

/* Get single user POST*/
postsRoute.get("/profile/:userId", verifyToken, getUserPosts);

/* LIKE  AND DISLIKE POST */
postsRoute.put("/like", verifyToken, likePost);

/*DISLIKE POST */
postsRoute.put("/dislike", verifyToken, DislikePost);

module.exports = {
  postsRoute,
};
