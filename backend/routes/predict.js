const express = require("express");
const router = express.Router();
const { exec } = require("child_process");

// Health Prediction API
router.post("/breast-cancer", async (req, res) => {
    console.log("Received request:", req.body);

    let userInput = req.body.features;
    if (!userInput || !Array.isArray(userInput)) {
        return res.status(400).json({ error: "Invalid input. Expected an array of features." });
    }

    // Convert features into a space-separated string for Python
    let args = userInput.join(" ");
    let pythonCommand = `/Users/spic/Desktop/NexusHealth/venv/bin/python3 /Users/spic/Desktop/NexusHealth/models/predict_breast_cancer.py ${args}`;

    console.log("🚀 Running command:", pythonCommand); // Debugging log

    exec(pythonCommand, (error, stdout, stderr) => {
        console.log("🐍 Python script executed...");

        if (error) {
            console.error("🔥 Execution Error:", error);
            return res.status(500).json({ error: error.message });
        }

        if (stderr) {
            console.error("⚠️ Python Script Error:", stderr);
            return res.status(500).json({ error: stderr });
        }

        console.log("📊 Python Output:", stdout);

        try {
            let predictionResult = JSON.parse(stdout.trim()); // Ensure JSON is clean
            console.log("📈 Prediction:", predictionResult);
            return res.json(predictionResult);
        } catch (parseError) {
            console.error("🚨 JSON Parsing Error:", parseError);
            return res.status(500).json({ error: "Failed to parse Python response." });
        }
    });
});

module.exports = router;
