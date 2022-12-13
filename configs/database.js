const mongoose = require("mongoose");
const Configuration = require("./configuration");

const connectDatabase = () => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(Configuration.DB_URL);
};

module.exports = connectDatabase;
