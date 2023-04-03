const express = require("express");
const { connect } = require("./Config/db");
const { authRoute } = require("./Controller/auth");
// const { register } = require("./Controller/auth");

require("dotenv").config();
const server = express();
const cors = require("cors");
const { userRoute } = require("./Routes/users.route");
server.use(express.json());

server.use(
  cors({
    origin: "*",
  })
);

server.use("/auth", authRoute);

/* Routes */
app.use("/user", userRoute);
// app.use("/posts", postRoutes);

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
