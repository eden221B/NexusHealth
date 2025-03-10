document.querySelectorAll(".tab-link").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        let tabId = this.getAttribute("data-tab");

        document.querySelectorAll(".tab").forEach(tab => {
            tab.classList.remove("active");
        });
        document.getElementById(tabId).classList.add("active");

        document.querySelectorAll(".tab-link").forEach(link => {
            link.classList.remove("active");
        });
        this.classList.add("active");
    });
});

// Breast Cancer Form Submission
document.getElementById('breastCancerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get user-friendly input values
    const age = parseInt(document.getElementById('age').value);
    const bmi = parseFloat(document.getElementById('bmi').value);
    const family_history = parseInt(document.getElementById('family_history').value);
    const smoking = parseInt(document.getElementById('smoking').value);
    const exercise = parseInt(document.getElementById('exercise').value);
    const menopause = parseInt(document.getElementById('menopause').value);

    // Feature Engineering: Convert user-friendly inputs to model-friendly format
    const features = [age, bmi, family_history, smoking, exercise, menopause];

    try {
        const response = await fetch("http://localhost:5113/predict/breast-cancer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ features })
        });

        if (!response.ok) {
            throw new Error("Server error or invalid response");
        }

        const data = await response.json();
        document.getElementById('predictionResult').innerHTML = `
            <h3>Prediction: ${data.prediction}</h3>
            <p>Confidence: Malignant - ${data.confidence.Malignant}%, Benign - ${data.confidence.Benign}%</p>
        `;
    } catch (error) {
        document.getElementById('predictionResult').innerHTML = `<h3>Error: ${error.message}</h3>`;
    }
});
