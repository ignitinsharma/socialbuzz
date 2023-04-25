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
/* 
express.json() middleware parses this string and 
converts it into a JavaScript object that 
can be accessed in your application.

like this -> {"name": "John", "age": 30}
to this -> { name: 'John', age: 30 }
*/
server.use(express.json());

/* 
 By using cors middleware, your Express server will be
 able to handle requests from other domains, 
 which can be useful if you're building a client-side web 
 application that needs to make API requests to your server
 */
server.use(
  cors({
    origin: "*",
  })
);

/* Auth controllers */
server.use("/auth", authController);

/* Post Data into Server */
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
