const express = require("express");
const cors = require("cors");
const Configuration = require("./configs/configuration");
const connectDatabase = require("./configs/database");
const UserModel = require("./models/user.model");

const app = express();

const routes = require("./routes");
const Utils = require("./utils/util");

app.use(cors());
app.use(express.json());
app.use("/api", routes);

setImmediate(async () => {
  try {
    await connectDatabase();
    console.log("Database connected");

    const admin = await UserModel.findOne({ username: "admin" });

    if (!admin) {
      const password = Utils.hashPassword("admin");
      await UserModel.create({
        username: "admin",
        password,
        role: "ADMIN",
      });
      console.log("Admin account created");
    }
  } catch (dbConnectError) {
    let errorMsg = "";
    if (typeof dbConnectError === "string") {
      errorMsg = dbConnectError;
    } else if (dbConnectError && typeof dbConnectError === "object") {
      errorMsg = dbConnectError.toString();
    }
    console.log(errorMsg);
  }

  app.listen(Configuration.APP_PORT, () => {
    console.log(`App listening on port: ${Configuration.APP_PORT}`);
  });
});
