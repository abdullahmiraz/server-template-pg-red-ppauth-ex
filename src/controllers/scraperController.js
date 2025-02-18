const { scrapeQueue } = require("../services/queueService"); // Import scrapeQueue
const { formatResponse, formatError } = require("../utils/returnFormats");

const scrapeWebsite = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json(formatError("URL is required"));

    // Add scraping job to the queue
    const job = await scrapeQueue.add("scrape", { url });

    // Respond with job ID, so the user knows their scraping is queued
    res.json(
      formatResponse(true, "Scraping started and is in queue", {
        jobId: job.id,
      })
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(formatError("Scraping failed"));
  }
};

module.exports = { scrapeWebsite };
