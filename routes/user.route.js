const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");
const authenticateJwt = require("../middlewares/auth.middleware");

router.get("/", userController.getUsers);

router.get("/:userId", authenticateJwt, userController.getDetail);

module.exports = router;
