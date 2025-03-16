const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Prediction = sequelize.define("Prediction", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    prediction: {
        type: DataTypes.STRING,
        allowNull: false
    },
    confidence: {
        type: DataTypes.JSON,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Prediction;
