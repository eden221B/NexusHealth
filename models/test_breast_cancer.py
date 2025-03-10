import numpy as np
import pandas as pd
import joblib
from sklearn.datasets import load_breast_cancer

# Load the saved model and scaler
model = joblib.load("breast_cancer.pkl")
scaler = joblib.load("scaler.pkl")

# Load dataset for feature reference
data = load_breast_cancer()
feature_names = data.feature_names

# Example input (Replace these values with actual patient data)
sample_input = np.array([
    17.99, 10.38, 122.8, 1001.0, 0.1184, 0.2776, 0.3001, 0.1471, 0.2419, 0.07871,
    1.095, 0.9053, 8.589, 153.4, 0.0064, 0.04904, 0.05373, 0.01587, 0.03003, 0.006193,
    25.38, 17.33, 184.6, 2019.0, 0.1622, 0.6656, 0.7119, 0.2654, 0.4601, 0.11890
])  # Example values from the dataset

# Scale input data
sample_input_scaled = scaler.transform([sample_input])

# Make a prediction
prediction = model.predict(sample_input_scaled)[0]  # 0 = Malignant, 1 = Benign
prediction_proba = model.predict_proba(sample_input_scaled)[0]  # Probability of each class

# Print results
print("\nBreast Cancer Prediction Result:")
print(f"Predicted Class: {'Benign' if prediction == 1 else 'Malignant'}")
print(f"Confidence: Malignant={prediction_proba[0]*100:.2f}%, Benign={prediction_proba[1]*100:.2f}%")
