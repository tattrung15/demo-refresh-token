const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const authenticateJwt = require("../middlewares/auth.middleware");

router.post("/login", authController.login);

router.post("/logout", authenticateJwt, authController.logout);

router.post("/access", authController.refreshToken);

module.exports = router;
