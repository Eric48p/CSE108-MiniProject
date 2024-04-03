from flask import Flask, request, jsonify
from flask_restful import abort
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView



# from sqlalchemy import create_engine, MetaData, Table

app = Flask(__name__)
app.secret_key = 'super secret key'
CORS(app)  # Enable CORS for all routes
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
admin = Admin(app)

class StudentsEnrolledInCourse(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  studentId = db.Column(db.Integer, db.ForeignKey('accountdetails.id'))
  courseId = db.Column(db.Integer, db.ForeignKey('courses.id'))
  grade = db.Column(db.Integer, nullable=False)

  def __repr__(self):
    return f'<Student: {self.studentId}, courseId: {self.courseId}>'

class StudentsEnrolledInCourseView(ModelView):
  column_list = ('id', 'studentId', 'courseId', 'grade')
  can_export = True

admin.add_view(StudentsEnrolledInCourseView(StudentsEnrolledInCourse, db.session))

class Accountdetails(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  firstName = db.Column(db.String(100), nullable=False)
  lastName = db.Column(db.String(100), nullable=False)
  email = db.Column(db.String(100), nullable=False)
  password = db.Column(db.String(100), nullable=False)
  role = db.Column(db.String(100), nullable=False)
  students_enrolled_in_course = db.relationship('StudentsEnrolledInCourse', backref='accountdetails')

  def __repr__(self):
    return f"Accountdetails(name = {self.firstName}, last_name = {self.lastName}, email = {self.email}, id = {self.id})"

  def to_dict(self):
    return {
        'id': self.id,
        'firstName': self.firstName,
        'lastName': self.lastName,
        'email': self.email,
        'role': self.role,
        'password' : self.password
    }

class AccountdetailsView(ModelView):
  column_list = ('id', 'firstName', 'lastName', 'email', 'role', 'password')
  can_export = True

admin.add_view(AccountdetailsView(Accountdetails, db.session))

class Courses(db.Model):
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  courseName = db.Column(db.String(100), nullable=False)
  teacher = db.Column(db.String(100), nullable=False)
  courseTime = db.Column(db.String(100), nullable=False)
  capacity = db.Column(db.Integer, nullable=False)
  totalEnrolled = db.Column(db.Integer, nullable=False)
  students_enrolled_in_course = db.relationship('StudentsEnrolledInCourse', backref='courses')

  def __repr__(self):
    return f'<Course: {self.courseName}, Id: {self.id}>'

  def to_dict(self):
    return {
        'id': self.id,
        'courseName': self.courseName,
        'teacher': self.teacher,
        'courseTime': self.courseTime,
        'capacity': self.capacity,
        'totalEnrolled' : self.totalEnrolled
    }

class CoursesView(ModelView):
  column_list = ('id', 'courseName', 'teacher', 'courseTime', 'capacity', 'totalEnrolled')
  can_export = True

admin.add_view(CoursesView(Courses, db.session))



# Allows student to view their courses they are registered for
@app.route('/studentCourses', methods=['GET'])
def student_registered_courses():
    data = request.json

    if data:
        role = data.get('role')
        firstName = data.get('firstName')
        lastName = data.get('lastName')

    student = Accountdetails.query.filter_by(firstName=firstName, lastName=lastName).first()

    if student.role != 'Student':
      return jsonify({'error': 'User is not a student'}), 404
    elif not student:
      return jsonify({'error': 'Student does not exist'}), 404

    registeredCourses = StudentsEnrolledInCourse.query.filter_by(accountdetails=student).all()

    courses = []
    for x in registeredCourses:
      courses.append(x.courses.to_dict())

    
    return jsonify(courses)

# Allows a teacher to see their courses
@app.route('/teacherCourses', methods=['GET'])
def teachers_courses():
    data = request.json

    if data:
      teacherName = data.get('teacher')

    teacher = Accountdetails.query.filter_by(firstName=teacherName.split()[0]).first()

    if teacher.role != 'Teacher':
      return jsonify({'error': 'User is not a teacher'}), 404
    elif not teacher:
      return jsonify({'message': 'Teacher does not exist'}), 404

    courses = Courses.query.filter_by(teacher=teacherName).all()

    teacherCourses = []
    for x in courses:
      teacherCourses.append(x.to_dict())

    
    return jsonify(teacherCourses)

# Allows a teacher to see all the students in a specific course
@app.route('/courseStudents', methods=['GET'])
def students_in_Course():
    data = request.json

    if data:
      teacher = data.get('teacher')
      courseName = data.get('courseName')

    course = Courses.query.filter_by(courseName=courseName).first()

    if teacher.role != 'Teacher':
      return jsonify({'error': 'User is not a teacher'}), 404
    elif not teacher:
      return jsonify({'message': 'Teacher does not exist'}), 404

    students = StudentsEnrolledInCourse.query.filter_by(courses=course).all()

    teacherCourses = []
    for x in courses:
      teacherCourses.append(x.to_dict())

    
    return jsonify(teacherCourses)

# Allows a student to view all courses available
@app.route('/allCourses', methods=['GET'])
def show_all_courses():
    data = request.json

    if data:
        firstName = data.get('firstName')
        lastName = data.get('lastName')

    student = Accountdetails.query.filter_by(firstName=firstName).first()

    if student.role != 'Student':
      return jsonify({'error': 'User is not a student'}), 404
    elif not student:
      return jsonify({'message': 'Student does not exist'}), 404

    allCourses = Courses.query.all()

    courses = []
    for x in allCourses:
      courses.append(x.to_dict())

    
    return jsonify(courses)

# How do you pass in '/createUser' from the app.route to the function
# Creates any user with any role
@app.route('/createUser', methods=['POST'])
def create_user():
    data = request.json

    if data:
        role = data.get('role')
        firstName = data.get('firstName')
        lastName = data.get('lastName')
        email = data.get('email')
        password = data.get('password')

        user_exist = Accountdetails.query.filter_by(email=email).first()

        if user_exist:
          return jsonify({'error': 'User already exist'}), 400
        else:
          new_user = Accountdetails(firstName=firstName, lastName=lastName, email=email, password=password, role=role)
          db.session.add(new_user)
          db.session.commit()

          # Process the user data here (e.g., store in database, etc.)
          # print(role, firstName, lastName, email, password)

          return jsonify({'message': 'User created successfully'}), 201
    else:
        return jsonify({'error': 'Invalid JSON'}), 400

# Allows a teacher to create a new course
@app.route('/createCourse', methods=['POST'])
def create_course():
    data = request.json

    if data:
      courseName = data.get('courseName')
      teacher = data.get('teacher')
      capacity = data.get('capacity')
      courseTime = data.get('courseTime')
      totalEnrolled = data.get('totalEnrolled')

      new_course = Courses(courseName=courseName, teacher=teacher, courseTime=courseTime, capacity=capacity, totalEnrolled=totalEnrolled)
      db.session.add(new_course)
      db.session.commit()

      return jsonify({'message': 'Course created successfully'}), 201
    else:
        return jsonify({'error': 'Invalid JSON'}), 400



# Registers a student for a course
@app.route('/enrollStudent', methods=['POST'])
def enroll_student():
    data = request.json

    if data:
      student_email = data.get('email')
      course_name = data.get('courseName')
      grade = 100

    student = Accountdetails.query.filter_by(email=student_email).first()
    course = Courses.query.filter_by(courseName=course_name).first()

    studentEnrollment = StudentsEnrolledInCourse.query.filter_by(accountdetails=student, courses=course).first()

    if studentEnrolled:
      return jsonify({'error': 'Student is already enrolled in the course'}), 400
      
    if student and student.role == 'Student':
        if not course:
          return jsonify({'error': 'Course does not exist'}), 400
        else:
          if course.totalEnrolled < course.capacity:
            enrollment = StudentsEnrolledInCourse(accountdetails=student, courses=course, grade=grade)
            db.session.add(enrollment)
            course.totalEnrolled = course.totalEnrolled + 1
            db.session.commit()
            return jsonify({'message': 'Student enrolled successfully'}), 201
          else:
            return jsonify({'error': 'Course is at capacity'}), 400
    else:
        return jsonify({'error': 'Invalid student ID or role'}), 400

# Allows student to drop a course
@app.route('/dropCourse', methods=['DELETE'])
def drop_student_from_course():
    data = request.json

    if data:
      student_email = data.get('email')
      course_name = data.get('courseName')
      
    course = Courses.query.filter_by(courseName=course_name).first()
    student_account = Accountdetails.query.filter_by(email=student_email).first()

    if course and student_account:
      studentEnrollment = StudentsEnrolledInCourse.query.filter_by(accountdetails=student_account, courses=course).first()

      if studentEnrollment:
        db.session.delete(studentEnrollment)
        course.totalEnrolled = course.totalEnrolled - 1
        db.session.commit()
        return jsonify({'message': 'Student dropped sucessfully'}), 201
      else:
        return jsonify({'error': 'Student is not enrolled in the course'}), 400

    else:
      return jsonify({'error': 'Student or Course does not exist'}), 400

@app.route('/deleteUser', methods=['DELETE'])
def delete_user():
    data = request.json

    if data:
      role = data.get('role')
      firstName = data.get('firstName')
      lastName = data.get('lastName')

    user = Accountdetails.query.filter_by(firstName=firstName).first()

    if user:
      db.session.delete(user)
      db.session.commit()
      
      return jsonify({'message': 'User deleted successfully'}), 201
    else:
      return jsonify({'message': 'User does not exist, cannot delete'}), 400

# with app.app_context():
#   db.create_all()
if __name__ == "__main__":
    app.run(debug=True)
