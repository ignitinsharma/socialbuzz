const { userModel } = require("../Model/users.model.js");
const { postModel } = require("../Model/posts.model.js");

/* CREATE */
const createPost = async (req, res) => {
  try {
    const { userId, updatedImage, postDescription } = req.body;
    const user = await userModel.findById(userId);
    const newPost = new postModel({
      /* This user id we are getting which user is posting  */
      userId,
      description: postDescription,
      postPicturePath: updatedImage,
      /* Here we are checking or setting if post user id or actual user if
      same or then we are setting post user to that user */
      // firstName: user.firstName,
      // lastName: user.lastName,
      fullName: user.fullName,
      location: user.location,
      userPicturePath: user.picturePath,
      likes: [],
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
  const userId = req.params.userId;
  // console.log("userId:", userId);
  try {
    const post = await postModel.find({ userId });
    // const post = await postModel.find();
    res.status(200).send(post);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

/* Like Post function */
const likePost = async (req, res) => {
  const { userId, postId } = req.body;
  try {
    postModel
      .findByIdAndUpdate(
        postId,
        /* User id got added into likes array  */
        { $push: { likes: userId } },
        {
          new: true,
        }
      )
      .then((updatedPost) => {
        res.json(updatedPost);
      })
      .catch((err) => {
        res.status(422).json({ error: err });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const DislikePost = async (req, res) => {
  const { userId, postId } = req.body;
  try {
    postModel
      .findByIdAndUpdate(
        postId,
        /* It means user id removed from likes array */
        { $pull: { likes: userId } },
        {
          new: true,
        }
      )
      .then((updatedPost) => {
        res.json(updatedPost);
      })
      .catch((err) => {
        res.status(422).json({ error: err });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const CommentPost = async (req, res) => {
  const { userId, postId, userComment, user } = req.body;
  console.log("user:", user);
  console.log("userComment:", userComment);
  console.log("postId:", postId);
  console.log("userId:", userId);
  const CommentsObject = {
    userComment: userComment,
    user: user,
    postedBy: userId,
  };
  try {
    postModel
      .findByIdAndUpdate(
        postId,
        { $push: { comments: CommentsObject } },
        {
          new: true,
        }
      )
      .then((updatedPost) => {
        res.json(updatedPost);
      })
      .catch((err) => {
        res.status(422).json({ error: err });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createPost,
  getAllFeedPosts,
  getUserPosts,
  likePost,
  DislikePost,
  CommentPost,
};
