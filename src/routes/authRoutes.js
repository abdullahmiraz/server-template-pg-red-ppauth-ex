const express = require("express");
const router = express.Router();
const { authController } = require("../controllers/index");

// Local Auth
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// Google Auth
router.get("/google", authController.googleAuth);
router.get(
  "/google/callback",
  authController.googleCallback,
  authController.googleRedirect
);

// Facebook Auth
router.get("/facebook", authController.facebookAuth);
router.get(
  "/facebook/callback",
  authController.facebookCallback,
  authController.facebookRedirect
);

module.exports = router;
