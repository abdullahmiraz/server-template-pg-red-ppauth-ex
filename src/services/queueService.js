const { Queue, Worker } = require("bullmq");
const { launchBrowser } = require("./puppeteerService");
const { ScrapedData } = require("../models/index");
const redis = require("../config/redis"); // Use the Redis connection

// Initialize the BullMQ queue
const scrapeQueue = new Queue("scrapeQueue", { connection: redis });

// Create the worker to process scraping jobs
const scrapeWorker = new Worker(
  "scrapeQueue",
  async (job) => {
    const { url } = job.data;
    console.log(`Processing scraping job for: ${url}`);

    // Puppeteer scraping logic
    const browser = await launchBrowser();
    const page = await browser.newPage();
    await page.goto(url);

    const pageTitle = await page.title(); // Example: extract the title of the page
    await browser.close();

    // Save scraped data to DB
    await ScrapedData.create({ url, title: pageTitle });

    return { title: pageTitle, url };
  },
  { connection: redis }
);

module.exports = { scrapeQueue, scrapeWorker };
