const { userModel } = require("../Model/users.model.js");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authController = express.Router();

authController.post("/register", async (req, res) => {
  /* Getting the things from the frontend  */
  const {
    // firstName,
    // lastName,
    fullName,
    email,
    password,
    updatedImage,
    friends,
    location,
    occupation,
  } = req.body;
  try {
    const saltRounds = 5;
    const hassing_password = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, hassing_password);

    const newUser = new userModel({
      // firstName,
      // lastName,
      fullName,
      email,
      password: passwordHash,
      picturePath: updatedImage,
      friends,
      location,
      occupation,
    });
    await newUser.save();
    res.status(201).send("User added successfully...");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

authController.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    /* checking is this password it same what user has entered
     with which is inside in db */
    const isMatch = await bcrypt.compare(password, user.password);

    /* If password isnt same so it will throw error */
    if (!isMatch) return res.status(400).send({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.Jwt_secret_key);
    delete user.password;

    /* Sending the user to frontend and token */
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = {
  authController,
};
