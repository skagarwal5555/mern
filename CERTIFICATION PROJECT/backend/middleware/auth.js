const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("token");
  console.log(token);
  if (token) {
    try {
      const decoded = jwt.verify(token, "randomString");
      req.user = decoded.user;
      next();
    } catch (e) {
      console.error(e);
      res.status(401).send({ message: "Invalid Token" });
    }
  } else {
    res.status(401).send({ message: "Authentication Failed. No Token" });
  }
};
