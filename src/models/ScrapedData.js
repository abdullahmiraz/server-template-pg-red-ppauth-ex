const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres");

const ScrapedData = sequelize.define("ScrapedData", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = ScrapedData;
