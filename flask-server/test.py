import requests
# import json

BASE = "http://127.0.0.1:5000/"

# response = requests.post(BASE + "createUser", json={'role' : 'Student', 'firstName' : 'Diego', 'lastName' : 'Chavez', 'email' : 'noemail@email.com', 'password' : 'SuperSecretPassword'})
# print(response.json())
# response = requests.delete(BASE + "deleteUser", json={'role' : 'Student', 'firstName' : 'Bob', 'lastName' : 'Simpson'})
# print(response.json())
# response = requests.post(BASE + 'createCourse', json={'courseName' : 'PE', 'teacher' : 'Bryan Carvallo', 'courseTime' : '2:00 - 3:00'})
# print(response.json())

response = requests.put(BASE + 'editCourse', json={'courseName' : 'PE', 'capacity' : 250, 'totalEnrolled' : 10})
print(response.json())

# response = requests.get(BASE + 'teacherCourses', json={'firstName' : 'Susan', 'lastName' : 'Miller'})
# print(response.json())

# response = requests.post(BASE + 'enrollStudent', json={'email' : 'bob14@gmail.com', 'courseName' : 'PE'})
# print(response.json())



# response = requests.get(BASE + 'getUserCredentials', json={'email' : 'jimmy92@gmail.com'})
# print(response.json())

# response = requests.get(BASE + 'login', json={'email' : 'jimm92@gmail.com', 'password' : '3759427'})
# print(response.json())

# response = requests.delete(BASE + 'dropCourse', json={'email' : 'bob14@gmail.com', 'courseName' : 'Art'})
# print(response.json())

response = requests.get(BASE + 'allCourses')
print(response.json())

# response = requests.put(BASE + 'editStudentGrade', json={'studentId' : '2', 'courseId' : '5', 'newGrade' : 21})
# print(response.json())


# response = requests.get(BASE + 'courseStudents', json={'id' : '3'})
# print(response.json())
# response = requests.get(BASE + 'studentCourses', json={'id' : '2'})
# print(response.json())