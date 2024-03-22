from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/createUser', methods=['POST'])
def create_user():
    data = request.json

    if data:
        role = data.get('role')
        firstName = data.get('firstName')
        lastName = data.get('lastName')
        email = data.get('email')
        password = data.get('password')

        # Process the user data here (e.g., store in database, etc.)
        print(role, firstName, lastName, email, password)

        return jsonify({'message': 'User created successfully'}), 201
    else:
        return jsonify({'error': 'Invalid JSON'}), 400

if __name__ == "__main__":
    app.run(debug=True)
