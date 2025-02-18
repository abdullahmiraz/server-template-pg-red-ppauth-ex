const puppeteer = require("puppeteer");

// Function to launch Puppeteer browser
const launchBrowser = async () => {
  return await puppeteer.launch({ headless: true });
};

module.exports = { launchBrowser };
