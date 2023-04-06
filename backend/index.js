const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const { authController } = require("./Controller/auth");
const { verifyToken } = require("./Middleware/auth.middlware");

require("dotenv").config();
const server = express();
const cors = require("cors");
const { userRoute } = require("./Routes/users.route");
const { postsRoute } = require("./Routes/post.route");
const { createPost } = require("./Controller/posts");
server.use(express.json());

server.use(
  cors({
    origin: "*",
  })
);

/* Auth controllers */
server.use("/auth", authController);
server.post("/posts", verifyToken, createPost);

/* Routes */
server.use("/user", userRoute);
server.use("/posts", postsRoute);

/* Running server */

server.listen(process.env.port, () => {
  mongoose
    .connect(process.env.mongoURL)
    .then(() =>
      console.log(`Connected to successfully on port: ${process.env.port}.`)
    )
    .catch((err) => console.log(err.message));
});
