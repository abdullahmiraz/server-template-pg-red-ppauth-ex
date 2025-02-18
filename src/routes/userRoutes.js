const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  ensureAuthenticated,
  authorizeRoles,
} = require("../middlewares/authMiddleware"); // ✅ Import middleware

router.get("/profile", ensureAuthenticated, userController.getProfile);
router.put("/profile", ensureAuthenticated, userController.updateProfile);
router.delete("/delete", ensureAuthenticated, userController.deleteUser);

// Example of role-based routes
router.get(
  "/admin/dashboard",
  ensureAuthenticated,
  authorizeRoles("admin"),
  userController.adminDashboard
);
router.get(
  "/premium/content",
  ensureAuthenticated,
  authorizeRoles("premium", "admin"),
  userController.premiumContent
);

module.exports = router;
