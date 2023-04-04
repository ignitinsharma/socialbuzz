const { userModel } = require("../Model/users.model.js");
const { postModel } = require("../Model/posts.model.js");

/* CREATE */
const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await userModel.findById(userId);
    const newPost = new postModel({
      userId,
      description,
      picturePath,
      /* Here we are checking or setting if post user id or actual user if 
      same or then we are setting post user to that user */
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      userPicturePath: user.picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    /* if user did post successfull then i'm just returing 
    all the post on the feed */
    const allUpdatedPost = await postModel.find();
    res.status(201).send(allUpdatedPost);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

/* Getting all feed posts */
const getAllFeedPosts = async (req, res) => {
  try {
    const post = await postModel.find();
    res.status(200).send(post);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

/* Getting users speific posts */
const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await postModel.find({ userId });
    res.status(200).send(post);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await postModel.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await postModel.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  getAllFeedPosts,
  getUserPosts,
  likePost,
};