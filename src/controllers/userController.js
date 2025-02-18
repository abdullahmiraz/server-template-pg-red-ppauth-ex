const { User } = require("../models");

// Get User Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching profile", error: err.message });
  }
};

// Update User Profile
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    res.json({ message: "Profile updated", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: err.message });
  }
};

// Delete User Account
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting account", error: err.message });
  }
};

// Admin Dashboard - Only accessible by 'admin' role
const adminDashboard = (req, res) => {
  res.json({
    message: "welcome to admin dashboard",
    user: req.user,
  });
};

// Premium Content - Accessible by 'premium' and 'admin' roles
const premiumContent = (req, res) => {
  res.json({
    message: "welcome to premium content for subscribed users",
    user: req.user,
  });
};

module.exports = {
  getProfile,
  updateProfile,
  deleteUser,
  adminDashboard,
  premiumContent,
};
