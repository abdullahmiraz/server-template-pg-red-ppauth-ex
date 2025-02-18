const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    provider: {
      type: DataTypes.STRING,
      defaultValue: "local",
    },
    providerId: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("admin", "premium", "basic"),
      defaultValue: "basic",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;
