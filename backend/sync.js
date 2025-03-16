const sequelize = require("./config/db");

async function syncDB() {
    try {
        await sequelize.sync({ force: false }); // Set `force: true` to reset tables
        console.log("✅ Database Synced!");
    } catch (error) {
        console.error("❌ Error syncing database:", error);
    } finally {
        process.exit();
    }
}

syncDB();
