const { userModel } = require("../Model/users.model.js");

const getAllRegisteredUser = async (req, res) => {
  try {
    const users = await userModel.find();
    // console.log("allusers", users);
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
  console.log("userWhoIsGettingFollower:", userWhoIsGettingFollower);
  console.log("userIdWhoIsFollowing:", userIdWhoIsFollowing);

  try {
    userModel
      .findByIdAndUpdate(
        { userId: userWhoIsGettingFollower },
        /* User id got added into likes array  */
        { $push: { followers: userIdWhoIsFollowing } },
        {
          new: true,
        }
      )
      .then((updatedFollowers) => {
        res.json(updatedFollowers);
      })
      .catch((err) => {
        res.status(422).json({ error: err });
      });
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

const getUnfollowUser = async (req, res) => {
  const { userId } = req.body;

  try {
    // const { id, friendId } = req.params;
    // const user = await userModel.findById(id);
    // const friend = await userModel.findById(friendId);

    // if (user.friends.includes(friendId)) {
    //   user.friends = userModel.friends.filter((id) => id !== friendId);
    //   friend.friends = friend.friends.filter((id) => id !== id);
    // } else {
    //   user.friends.push(friendId);
    //   friend.friends.push(id);
    // }
    // await user.save();
    // await friend.save();

    // const friends = await Promise.all(
    //   user.friends.map((id) => userModel.findById(id))
    // );
    // const formattedFriends = friends.map(
    //   ({ _id, firstName, lastName, occupation, location, picturePath }) => {
    //     return { _id, firstName, lastName, occupation, location, picturePath };
    //   }
    // );

    res.status(200).send();
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};
// const getUnfollowUser = async (req, res) => {
//   try {
//     const { id, friendId } = req.params;
//     const user = await userModel.findById(id);
//     const friend = await userModel.findById(friendId);

//     if (user.friends.includes(friendId)) {
//       user.friends = userModel.friends.filter((id) => id !== friendId);
//       friend.friends = friend.friends.filter((id) => id !== id);
//     } else {
//       user.friends.push(friendId);
//       friend.friends.push(id);
//     }
//     await user.save();
//     await friend.save();

//     const friends = await Promise.all(
//       user.friends.map((id) => userModel.findById(id))
//     );
//     const formattedFriends = friends.map(
//       ({ _id, firstName, lastName, occupation, location, picturePath }) => {
//         return { _id, firstName, lastName, occupation, location, picturePath };
//       }
//     );

//     res.status(200).send(formattedFriends);
//   } catch (err) {
//     res.status(404).send({ message: err.message });
//   }
// };

module.exports = {
  // getUserFromSearch,
  getAllRegisteredUser,
  getUser,
  getFollowUser,
  getUnfollowUser,
};
