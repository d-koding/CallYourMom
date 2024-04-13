from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/users")
def members():
    return {"users": ["Member1", "Member2", "Member3"]}

if __name__ == "__main__":
    app.run(debug=True)
