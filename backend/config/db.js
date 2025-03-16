const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nexus_health", "root", "EdenHolmes1895_", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",  // Use MySQL as the database
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("🔥 Database connection error:", error);
  }
}

connectDB();

module.exports = sequelize;
