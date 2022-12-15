const jwt = require("jsonwebtoken");
const Configuration = require("../configs/configuration");

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    const token = authHeader.split(/\s/)[1];

    jwt.verify(token, Configuration.SECRET_KEY || "", (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "jwt expired" });
        }
        return handleUnauthorized(req, res);
      }
      req.user = user;
      return next();
    });
  } else {
    return handleUnauthorized(req, res);
  }
};

const handleUnauthorized = (req, res) => {
  return res.status(401).json({ message: "Unauthorized request" });
};

module.exports = authenticateJwt;
