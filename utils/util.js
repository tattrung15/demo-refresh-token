const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Configuration = require("../configs/configuration");

const hashPassword = (password, salt = 10) => {
  return bcryptjs.hashSync(password, salt);
};

const comparePassword = (password, hash) => {
  return bcryptjs.compareSync(password, hash);
};

const generateToken = (payload, expiresIn = Configuration.JWT_EXPIRATION) => {
  return jwt.sign(payload, Configuration.SECRET_KEY, {
    expiresIn,
  });
};

const generateTokens = (payload) => {
  const accessToken = generateToken(payload);
  const refreshToken = generateToken(
    payload,
    Configuration.JWT_REFRESH_EXPIRATION
  );
  return [accessToken, refreshToken];
};

const Utils = {
  hashPassword,
  comparePassword,
  generateToken,
  generateTokens,
};

module.exports = Utils;
