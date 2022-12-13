const jwt = require("jsonwebtoken");
const Configuration = require("../configs/configuration");
const UserModel = require("../models/user.model");
const Utils = require("../utils/util");

const login = async (req, res) => {
  try {
    const body = req.body;

    const user = await UserModel.findOne({ username: body.username });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Username or password incorrect" });
    }

    if (!Utils.comparePassword(body.password, user.password)) {
      return res
        .status(400)
        .json({ message: "Username or password incorrect" });
    }

    const userInfo = {
      id: user._id,
      username: user.username,
    };

    const [accessToken, refreshToken] = Utils.generateTokens(userInfo);

    user.refreshToken = refreshToken;

    await user.save();

    res.status(200).json({
      user: userInfo,
      accessToken,
      refreshToken,
    });
  } catch (e) {
    res.status(400).json({ message: e.toString() });
  }
};

const logout = async (req, res) => {
  try {
    const user = req.user;

    const result = await UserModel.findByIdAndUpdate(
      user.id,
      {
        refreshToken: null,
      },
      { new: true }
    );

    res.status(200).json({
      user: {
        id: result._id,
        username: result.username,
      },
    });
  } catch (e) {
    res.status(400).json({ message: e.toString() });
  }
};

const refreshToken = async (req, res) => {
  try {
    const body = req.body;

    const user = await UserModel.findOne({ refreshToken: body.refreshToken });

    if (!user) {
      return res
        .status(403)
        .json({ message: "Refresh token is not in database" });
    }

    try {
      jwt.verify(body.refreshToken, Configuration.SECRET_KEY);
    } catch (e) {
      await UserModel.findByIdAndUpdate(user.id, {
        refreshToken: null,
      });
      return res.status(400).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
    }

    const userInfo = {
      id: user._id,
      username: user.username,
    };

    const newAccessToken = Utils.generateToken(userInfo);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: user.refreshToken,
    });
  } catch (e) {
    res.status(400).json({ message: e.toString() });
  }
};

module.exports = {
  login,
  logout,
  refreshToken,
};
