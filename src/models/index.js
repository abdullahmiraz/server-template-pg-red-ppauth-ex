const sequelize = require("../config/postgres");
const User = require("./User");
const ScrapedData = require("./ScrapedData");

// Export models and sequelize instance
module.exports = { sequelize, User, ScrapedData };
