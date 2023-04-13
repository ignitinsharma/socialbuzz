const { userModel } = require("../Model/users.model.js");
const { postModel } = require("../Model/posts.model.js");

/* CREATE */
const createPost = async (req, res) => {
  try {
    const { userId, updatedImage, postDescription } = req.body;
    console.log(
      "all three things getting",
      userId,
      updatedImage,
      postDescription
    );
    const user = await userModel.findById(userId);
    const newPost = new postModel({
      /* This user id we are getting which user is posting  */
      userId,
      description: postDescription,
      postPicturePath: updatedImage,
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

    /* if user did post successful then i'm just returing
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
  const { userId } = req.body;
  try {
    const post = await postModel.find({ userId });
    // const post = await postModel.find();
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
