const express = require("express");
const { verifyToken } = require("../Middleware/auth.middlware.js");
const {
  getAllFeedPosts,
  getUserPosts,
  likePost,
  DislikePost,
  CommentPost,
} = require("../Controller/posts");
const { postModel } = require("../Model/posts.model.js");
const postsRoute = express.Router();

/* GET ALL FEED POSTS */
postsRoute.get("/", verifyToken, getAllFeedPosts);

/* GET SINGLE USER POST*/
postsRoute.get("/profile/:userId", verifyToken, getUserPosts);

/* LIKE POST */
postsRoute.put("/like", verifyToken, likePost);

/*DISLIKE POST */
postsRoute.put("/dislike", verifyToken, DislikePost);

/*COMMENT POST */
postsRoute.put("/comment", verifyToken, CommentPost);

module.exports = {
  postsRoute,
};
