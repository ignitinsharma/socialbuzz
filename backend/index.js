const express = require("express");
const { connect } = require("./Config/db");
const { authController } = require("./Controller/auth");

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
// server.post("/posts", verifyToken, createPost);

/* Routes */
server.use("/user", userRoute);
server.use("/posts", postsRoute);

/* Running server */
server.listen(process.env.port || 8081, async () => {
  try {
    await connect;
    console.log("Connected to successfully.");
  } catch (error) {
    console.log(`something went wrong ${error.message}`);
  }

  console.log(`Server is running on the port ${process.env.port}`);
});
