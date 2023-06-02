const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    followers: [
      {
        type: ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: ObjectId,
        ref: "user",
      },
    ],
    location: String,
    occupation: String,
  },
  { timestamps: true },
  { versionKey: false }
);

const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel,
};
