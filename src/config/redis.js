const Redis = require("ioredis");
require("dotenv").config();

// Initialize Redis client
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  maxRetriesPerRequest: null, // Disable retries per request, dont remove this
});

redis
  .on("connect", () => console.log("✅ Redis connected"))
  .on("error", (err) => console.error("❌ Redis connection failed", err));

module.exports = redis;
