from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

class AccountDetails(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  firstName = db.Column(db.String(100), nullable=False)
  lastName = db.Column(db.String(100), nullable=False)
  email = db.Column(db.String(100), nullable=False)
  password = db.Column(db.String(100), nullable=False)
  role = db.Column(db.String(100), nullable=False)
  student = db.relationship('StudentsEnrolledInCourse', backref='')

class Courses(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  courseName = db.Column(db.String(100), nullable=False)
  teacher = db.Column(db.String(100), nullable=False)
  courseTime = db.Column(db.String(100), nullable=False)
  capacity = db.Column(db.Integer, nullable=False)
  totalEnrolled = db.Column(db.Integer, nullable=False)

class StudentsEnrolledInCourse(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  studentId = db.Column(db.Integer, nullable=False)
  courseId = db.Column(db.Integer, nullable=False)
  grade = db.Column(db.Integer, nullable=False)

# How do you pass in '/createUser' from the app.route to the function
@app.route('/createUser', methods=['POST'])
def create_user():
    data = request.json
    print(data)

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
