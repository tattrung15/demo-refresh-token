const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");
const authenticateJwt = require("../middlewares/auth.middleware");
const checkRoles = require("../middlewares/role.middleware");

router.get("/", authenticateJwt, userController.getUsers);

router.get(
  "/:userId",
  authenticateJwt,
  checkRoles(["ADMIN"]),
  userController.getDetail
);

module.exports = router;
