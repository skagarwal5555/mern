const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.cookies.access_token;
  console.log(req.cookies.access_token);
  if (token)
  {
    console.log(token);
    try {
      const decoded = jwt.verify(token, "randomString");
      req.user = decoded.user;
      next();
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "Invalid Token" });
    }
  }
  else
  {
    next();
  }
};