const { PythonShell } = require("python-shell");

let options = {
    mode: "text",
    pythonPath: "/Users/spic/Desktop/NexusHealth/venv/bin/python3",
    scriptPath: "/Users/spic/Desktop/NexusHealth/models/",
    args: ["17.99", "10.38", "122.8", "1001.0", "0.1184", "0.2776", "0.3001", "0.1471", "0.2419", "0.07871", "1.095", "0.9053", "8.589", "153.4", "0.0064", "0.04904", "0.05373", "0.01587", "0.03003", "0.006193", "25.38", "17.33", "184.6", "2019.0", "0.1622", "0.6656", "0.7119", "0.2654", "0.4601", "0.11890"]
};

console.log("🚀 Running test script...");

PythonShell.run("predict_breast_cancer.py", options, function (err, results) {
    if (err) {
        console.error("❌ Python Error:", err);
    } else {
        console.log("✅ Python Output:", results);
    }
});
