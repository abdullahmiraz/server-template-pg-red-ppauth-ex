const express = require("express");
const router = express.Router();
const { scraperController } = require("../controllers/index");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

router.post("/scrape", ensureAuthenticated, scraperController.scrapeWebsite);

module.exports = router;
