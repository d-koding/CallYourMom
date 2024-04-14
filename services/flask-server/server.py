from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from drink_estimate import *

app = Flask(__name__)
CORS(app)

# Configurations
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    profile = db.relationship('UserProfile', back_populates='user', uselist=False, lazy=True)

class UserProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True)
    weight = db.Column(db.Float)
    height = db.Column(db.Float)
    age = db.Column(db.Integer)
    ethnicity = db.Column(db.String(100))
    user = db.relationship('User', back_populates='profile')




# Create the SQLite database and tables
with app.app_context():
    db.create_all()

# Route for user registration
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not (name and email and password):
        return jsonify({'message': 'All fields are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 409

    new_user = User(name=name, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    # Create UserProfile with default values
    new_profile = UserProfile(user_id=new_user.id, weight=None, height=None, age=None, ethnicity=None)
    db.session.add(new_profile)
    db.session.commit()

    return jsonify({'message': 'User registered successfully!'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Both email and password are required'}), 400

    user = User.query.filter_by(email=email).first()
    if user and user.password == password:
        return jsonify({'success': True, 'message': 'Login successful!'}), 200
    else:
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

# Flask endpoint to update user profile
@app.route('/update-profile/<int:user_id>', methods=['POST'])
def update_profile(user_id):
    data = request.json
    user_profile = UserProfile.query.filter_by(user_id=user_id).first()
    if not user_profile:
        return jsonify({'message': 'User profile not found'}), 404

    user_profile.weight = data.get('weight', user_profile.weight)
    user_profile.height = data.get('height', user_profile.height)
    user_profile.age = data.get('age', user_profile.age)
    user_profile.ethnicity = data.get('ethnicity', user_profile.ethnicity)
    
    db.session.commit()
    return jsonify({'message': 'Profile updated successfully'}), 200

@app.route('/process-data', methods=['POST'])
def process_data():
    data = request.json
    weight = int(data.get('weight'))
    height = int(data.get('height')) / 100

    bmi = weight / ((height) ** 2)
    data2 = load_data('morepoints.csv')
    print(data2)
    model = train_model(data2)
    drinks = round(predict_drink_tolerance(model, bmi, height))
    print("this shit is working")


    processed_message = f"" + str(drinks) + ""
    return jsonify({'message': processed_message}), 200



# Start the Flask application
if __name__ == '__main__':
    app.run(debug=True)
