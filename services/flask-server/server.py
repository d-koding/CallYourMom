from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

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


# Start the Flask application
if __name__ == '__main__':
    app.run(debug=True)
