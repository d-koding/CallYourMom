# import pandas as pd
# import numpy as np
# from sklearn.model_selection import train_test_split
# from sklearn.linear_model import LinearRegression
# from sklearn.metrics import mean_squared_error, r2_score

# # Load data from an Excel file
# def load_data(filepath):
#     return pd.read_csv('morepoints.csv')

# # Train a Linear Regression model
# def train_model(data):
#     X = data[['BMI']]  # Feature matrix (BMI)
#     y = data['Drink Tolerance']  # Target variable (Drink Tolerance)
#     X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
#     model = LinearRegression()
#     model.fit(X_train, y_train)
#     y_pred = model.predict(X_test)
#     mse = mean_squared_error(y_test, y_pred)
#     r2 = r2_score(y_test, y_pred)
#     print(f'Mean Squared Error: {mse}, R-squared: {r2}')
#     return model

# # Calculate BMI from weight and height
# def calculate_bmi(weight_kg, height_m):
#     return weight_kg / (height_m ** 2)

# # Predict drink tolerance and convert to drink types
# def predict_drink_tolerance(model, weight_kg, height_m):
#     bmi = calculate_bmi(weight_kg, height_m)
#     tolerance = model.predict([[bmi]])[0]
#     return tolerance

# # Main function to load data, train model, and make predictions
# def main(filepath, weight_kg, height_m):
#     data = load_data(filepath)
#     model = train_model(data)
#     drinks = predict_drink_tolerance(model, weight_kg, height_m)
#     print(f'Based on BMI, your estimated tolerance is: {drinks:.2f} drinks')

# # Example usage
# if __name__ == "__main__":
#     filepath = 'morepoints.csv'  # Replace with your actual file path
#     main(filepath, 70, 1.75)  # Example person with 70 kg weight and 1.75 m height
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score, KFold
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_squared_error, r2_score

# Function to load data remains the same
def load_data(filepath):
    return pd.read_csv(filepath)

# Updated train model function with cross-validation and polynomial features
def train_model(data):
    X = data[['BMI']].values  # Feature matrix (BMI)
    y = data['Drink Tolerance'].values  # Target variable (Drink Tolerance)
    polynomial_features = PolynomialFeatures(degree=2)
    linear_regression = Ridge(alpha=1.0)  # Regularization to avoid overfitting
    pipeline = make_pipeline(StandardScaler(), polynomial_features, linear_regression)
    
    # Cross-validation
    kfold = KFold(n_splits=5, shuffle=True, random_state=42)
    scores = cross_val_score(pipeline, X, y, cv=kfold, scoring='neg_mean_squared_error')
    pipeline.fit(X, y)  # Fit the model
    
    # Use the model fitted on the entire dataset for the final prediction
    return pipeline, -scores.mean()

# Function to calculate BMI remains the same
def calculate_bmi(weight_kg, height_m):
    return weight_kg / (height_m  ** 2)

# Function to predict drink tolerance remains the same
def predict_drink_tolerance(model, weight_kg, height_m):
    bmi = calculate_bmi(weight_kg, height_m)
    tolerance = model.predict([[bmi]])[0]
    return tolerance

# Main function updates with cross-validation
def main(filepath, weight_kg, height_m):
    data = load_data(filepath)
    model, mse = train_model(data)
    print(f'Cross-validated MSE: {mse}')
    drinks = predict_drink_tolerance(model, weight_kg, height_m)
    print(f'Based on your demographics, you should have at most: {drinks:.2f} drinks')

# Example usage updates file path
if __name__ == "__main__":
    filepath = 'morepoints.csv'  # Update to the correct CSV file path
    main(filepath, 56.7, 1.62)  # Example person with 70 kg weight and 1.75 m height
