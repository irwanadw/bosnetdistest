const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        res.status(400).json({
          status: "Authentication fail",
          message: "token is not valid!",
        });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json({
      status: "Authentication fail",
      message: "You should login first!",
    });
  }
};

module.exports = { verifyToken };
