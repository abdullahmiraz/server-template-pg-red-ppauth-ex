const passport = require("passport");
const { User } = require("../models/index");
const bcrypt = require("bcryptjs");
const { formatUser } = require("../utils/returnFormats");

// Manual Signup (Local Strategy)
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user (Assume password is hashed in model hook)
    user = await User.create({ name, email, password: hashedPassword });

    res
      .status(201)
      .json({ message: "Signup successful", user: formatUser(user) });
  } catch (err) {
    res.status(500).json({ message: "Error signing up", error: err.message });
  }
};

// Manual Login (Local Strategy)
const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed" });
      res.json({ message: "Login successful", user: formatUser(user) });
    });
  })(req, res, next);
};

// Google OAuth Login
const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});
const googleCallback = passport.authenticate("google", {
  failureRedirect: "/login",
});

const googleRedirect = (req, res) => {
  res.json({ message: "Google login successful", user: formatUser(req.user) });
};

// Facebook OAuth Login
const facebookAuth = passport.authenticate("facebook", { scope: ["email"] });
const facebookCallback = passport.authenticate("facebook", {
  failureRedirect: "/login",
});

const facebookRedirect = (req, res) => {
  res.json({
    message: "Facebook login successful",
    user: formatUser(req.user),
  });
};

// Logout
const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logged out successfully" });
  });
};

module.exports = {
  signup,
  login,
  googleAuth,
  googleCallback,
  googleRedirect,
  facebookAuth,
  facebookCallback,
  facebookRedirect,
  logout,
};
