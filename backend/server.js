const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const predictRoutes = require("./routes/predict");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5113;

// Allow requests from all origins
app.use(cors({
    origin: "*",  // Change this to frontend URL if needed
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(bodyParser.json());

// API Routes
app.use("/predict", predictRoutes);

app.get("/", (req, res) => {
    res.send("Medical Assistance System API is running...");
});


app.use("/auth", authRoutes);


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
