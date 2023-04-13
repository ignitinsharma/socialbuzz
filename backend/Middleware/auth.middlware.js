const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, process.env.Jwt_secret_key);
    if (decoded) {
      // console.log("decoded:", decoded);
      const userID = decoded.id;
      // console.log("userID:", userID);
      req.body.userID = userID;
      next();
    } else {
      res.send({ msg: "Please login first" });
    }
  } else {
    res.send({ msg: "Please login first" });
  }
};

module.exports = {
  verifyToken,
};
