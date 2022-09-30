const jwt = require("jsonwebtoken");

const decodeToken = (req) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  return jwt.decode(token);
};

module.exports = { decodeToken };
