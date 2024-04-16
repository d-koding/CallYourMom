#imports
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Load data from an Excel file
def load_data(filepath):
    return pd.read_csv('bmi.csv')

# Train a Linear Regression model
def train_model(data):
    X = data[['BMI']]  # Feature matrix (BMI)
    y = data['Drink Tolerance']  # Target variable (Drink Tolerance)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = LinearRegression()
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    print(f'Mean Squared Error: {mse}, R-squared: {r2}')
    return model

# Calculate BMI from weight and height
def calculate_bmi(weight_kg, height_m):
    return weight_kg / (height_m ** 2)

# Predict drink tolerance and convert to drink types
def predict_drink_tolerance(model, weight_kg, height_m):
    bmi = calculate_bmi(weight_kg, height_m)
    tolerance = model.predict([[bmi]])[0]
    return tolerance

# Main function to load data, train model, and make predictions
def main(filepath, weight_kg, height_m):
    data = load_data(filepath)
    model = train_model(data)
    drinks = predict_drink_tolerance(model, weight_kg, height_m)
    print(f'Based on BMI, estimated tolerance is: {drinks:.2f} drinks')

# Example usage
if __name__ == "__main__":
    filepath = 'bmi.csv'  # Replace with your actual file path
    main(filepath, 70, 1.75)  # Example person with 70 kg weight and 1.75 m height
