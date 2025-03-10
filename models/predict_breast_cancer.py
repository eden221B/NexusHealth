import sys
import joblib
import numpy as np
import json

# Load trained model and scaler
model = joblib.load("/Users/spic/Desktop/NexusHealth/models/breast_cancer.pkl")
scaler = joblib.load("/Users/spic/Desktop/NexusHealth/models/scaler.pkl")  # If you have a scaler
#print("Model Classes:", model.classes_)  # ✅ Check the order of classes


def process_input(user_features):
    """
    Convert user-friendly inputs into model-compatible format.
    """
    age, bmi, family_history, smoking, exercise, menopause = user_features

    processed_features = [
        age * 0.5,  
        bmi * 1.2, 
        1.5 if family_history else 0.5,
        2.0 if smoking else 1.0,
        0.8 if exercise > 3 else 1.2,
        1.3 if menopause else 0.7
    ]

    # 🔴 Fill the remaining 24 features with dummy values (Modify as needed)
    processed_features += [0] * 24  

    return np.array(processed_features).reshape(1, -1)


if __name__ == "__main__":
    # Read input features from command-line arguments
    user_input = list(map(float, sys.argv[1:]))

    # Process input to match the model format
    features = process_input(user_input)

    # Make prediction
    confidence = model.predict_proba(features)[0] * 100
    predicted_label = "Malignant" if confidence[1] > confidence[0] else "Benign"  # ✅ Fix here

    result = {
        "prediction": predicted_label,
        "confidence": {
            "Malignant": float(confidence[1]),  
            "Benign": float(confidence[0])  
        }
    }

    print(json.dumps(result))  # ✅ Ensure valid JSON output
