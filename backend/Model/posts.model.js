const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    postPicturePath: String,
    userPicturePath: String,
    likes: [
      {
        type: ObjectId,
        ref: "user",
      },
    ],
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
  { versionKey: false }
);

const postModel = mongoose.model("post", postSchema);

module.exports = {
  postModel,
};
