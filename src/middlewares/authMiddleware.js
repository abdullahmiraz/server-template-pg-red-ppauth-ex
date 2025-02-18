// const passport = require("passport");

module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  },

  authorizeRoles:
    (...roles) =>
    (req, res, next) => {
      if (roles.includes(req.user.role)) return next();
      res.status(403).json({ message: "Forbidden: Access denied" });
    },
};
