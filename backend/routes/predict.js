const express = require("express");
const jwt = require("jsonwebtoken");
const { exec } = require("child_process");
const Prediction = require("../models/Prediction");
const User = require("../models/User");

const router = express.Router();
const SECRET_KEY = "your_secret_key";

// Middleware to check authentication
function authMiddleware(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid token" });
    }
}

// Prediction Route (Now Saves Data)
router.post("/breast-cancer", authMiddleware, async (req, res) => {
    console.log("Authenticated request:", req.user);
    const userInput = req.body.features;

    if (!userInput || !Array.isArray(userInput)) {
        return res.status(400).json({ error: "Invalid input. Expected an array of features." });
    }

    const pythonCommand = `/Users/spic/Desktop/NexusHealth/venv/bin/python3 /Users/spic/Desktop/NexusHealth/models/predict_breast_cancer.py ${userInput.join(" ")}`;
    
    exec(pythonCommand, async (err, stdout, stderr) => {
        if (err) {
            console.error("Python Error:", err);
            return res.status(500).json({ error: "Error executing Python script" });
        }

        try {
            const predictionResult = JSON.parse(stdout);
            console.log("Prediction Result:", predictionResult);

            // Save prediction to database
            await Prediction.create({
                userId: req.user.userId,
                prediction: predictionResult.prediction,
                confidence: predictionResult.confidence
            });

            return res.json(predictionResult);
        } catch (parseError) {
            console.error("JSON Parsing Error:", parseError);
            return res.status(500).json({ error: "Failed to parse Python response." });
        }
    });
});

module.exports = router;
