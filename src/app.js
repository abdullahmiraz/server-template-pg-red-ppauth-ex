const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();
require("./config/passport"); // Load Passport Strategies
require("./services/queueService"); // Initialize Redis and BullMQ (import your queue service)

const sequelize = require("./config/postgres"); // Connect DB

// routes imports
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const scraperRoutes = require("./routes/scraperRoutes");

// Initialize Express App
const app = express();

// utils

const { setQueues, BullBoard } = require("@bull-board/express");
const { scrapeQueue } = require("./services/queueService");

// app.use("/admin/queues", BullBoard);

// Middleware
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }, // Session lasts 1 day
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev"));

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/scraper", scraperRoutes);

// Database Sync
sequelize
  .sync({ alter: true })
  .then(() => console.log("✅ Database Synced"))
  .catch((err) => console.error("❌ Database Sync Error:", err));

module.exports = app;
