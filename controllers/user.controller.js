const UserModel = require("../models/user.model");

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password -refreshToken");

    res.status(200).json({ data: users });
  } catch (e) {
    res.status(400).json({ message: e.toString() });
  }
};

const getDetail = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await UserModel.findById(userId).select(
      "-password -refreshToken"
    );

    res.status(200).json({ data: user });
  } catch (e) {
    res.status(400).json({ message: e.toString() });
  }
};

module.exports = {
  getUsers,
  getDetail,
};
