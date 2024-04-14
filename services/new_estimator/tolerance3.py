import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Load data from a CSV file
def load_data(filepath):
    # Reads CSV file assuming the columns are named 'Height', 'Weight', and 'Alcohol Tolerance'
    data = pd.read_csv(filepath)
    return data

# Train a Linear Regression model
def train_model(data):
    X = data[['Height', 'Weight']]  # Use Height and Weight as features
    y = data['Alcohol Tolerance']  # Target variable (Alcohol Tolerance)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = LinearRegression()
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    print(f'Mean Squared Error: {mse}, R-squared: {r2}')
    return model

# Predict drink tolerance using height and weight
def predict_drink_tolerance(model, height, weight):
    tolerance = model.predict([[height, weight]])[0]  # Predict using an array of features
    return tolerance

# Main function to load data, train model, and make predictions
def main(filepath):
    data = load_data(filepath)
    model = train_model(data)
    # Example prediction for someone with a specific height and weight
    height_example = 1.75  # Example height in meters
    weight_example = 70  # Example weight in kilograms
    drinks = predict_drink_tolerance(model, height_example, weight_example)
    print(f'Based on your height and weight, you should have at most: {drinks:.2f} drinks')

# Example usage
if __name__ == "__main__":
    filepath = './points.csv'  # Replace with the actual path to your CSV file
    main(filepath)
