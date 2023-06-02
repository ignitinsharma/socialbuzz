const { userModel } = require("../Model/users.model.js");

const getUserFromSearch = async (req, res) => {
  try {
    const { query } = req.body;

    // Create a regular expression object with the query
    const regex = new RegExp(query, "i");

    // Use the regular expression to search in MongoDB
    const user = await userModel.find({ fullName: regex });
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

const getAllRegisteredUser = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    /* Grabbing the id from the params */
    const { id } = req.params;
    const user = await userModel.findById(id);
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

const getFollowUser = async (req, res) => {
  const { userIdWhoIsFollowing, userWhoIsGettingFollower } = req.body;
  try {
    const user = await userModel.findByIdAndUpdate(
      { _id: userWhoIsGettingFollower },
      { $push: { followers: userIdWhoIsFollowing } },
      { new: true }
    );

    res.json(user.followers);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

const getUnfollowUser = async (req, res) => {
  const { userIdWhoIsFollowing, userWhoIsGettingFollower } = req.body;
  try {
    const user = await userModel.findByIdAndUpdate(
      { _id: userWhoIsGettingFollower },
      { $pull: { followers: userIdWhoIsFollowing } },
      { new: true }
    );
    res.json(user.followers);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

module.exports = {
  getUserFromSearch,
  getAllRegisteredUser,
  getUser,
  getFollowUser,
  getUnfollowUser,
};
