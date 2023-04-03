const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, process.env.Jwt_secret_key);
    if (decoded) {
      const userID = decoded.userID;
      console.log(decoded);
      req.body.userID = userID;
      next();
    } else {
      res.send({ msg: "Please login first" });
    }
  } else {
    res.send({ msg: "Please login first" });
  }
};

// try {
//   let token = req.header("Authorization");

//   if (!token) {
//     return res.status(403).send("Access Denied");
//   }

//   if (token.startsWith("Bearer ")) {
//     token = token.slice(7, token.length).trimLeft();
//   }

//   const verified = jwt.verify(token, process.env.JWT_SECRET);
//   req.user = verified;
//   next();
// } catch (err) {
//   res.status(500).json({ error: err.message });
// }

module.exports = {
  verifyToken,
};
