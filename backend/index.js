import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import path from "path";

dotenv.config();
const server = express();
server.use("/", (req, res) => {
  res.send("Home page");
});
server.use(express.json());

const RUNPORT = process.env.PORT || 8080;
mongoose
  .connect(process.env.mongoURL)
  .then(() => {
    server.listen(PORT, (req, res) => {
      console.log(`Server on running Port: ${RUNPORT}`);
      res.end(`Server on running Port: ${RUNPORT}`);
    });
  })
  .catch((error) => console.log(`${error} something went wrong `));
