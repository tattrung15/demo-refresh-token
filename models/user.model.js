const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      requried: true,
    },
    role: {
      type: String,
      requried: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", userSchema, "user");
module.exports = UserModel;
