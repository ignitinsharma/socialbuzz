const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    fullName: {
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
    comments: [
      {
        userComment: { type: String },
        user: { type: Object },
        postedBy: { type: ObjectId, ref: "user" },
      },
    ],
  },
  { timestamps: true },
  { versionKey: false }
);

const postModel = mongoose.model("post", postSchema);

module.exports = {
  postModel,
};
