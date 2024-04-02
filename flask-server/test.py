import requests
# import json

BASE = "http://127.0.0.1:5000/"

# response = requests.post(BASE + "enrollStudent", json={'role' : 'Student', 'firstName' : 'Diego', 'courseName' : 'English 101', 'grade' : '58'})
# print(response.json())
# response = requests.delete(BASE + "deleteUser", json={'role' : 'Student', 'firstName' : 'Bob', 'lastName' : 'Simpson'})
# print(response.json())
# response = requests.post(BASE + 'createCourse', json={'role' : 'Teacher', 'courseName' : 'Science', 'teacher' : 'Sarah Miller', 'courseTime' : '8:30 AM - 9:30 AM', 'capacity' : 200, 'totalEnrolled' : 10})
# print(response.json())

response = requests.get(BASE + 'studentCourses', json={'firstName' : 'Diego', 'lastName' : 'Sanchez'})
print(response.json())

# import requests

# BASE_URL = "http://127.0.0.1:5000/"
# ENDPOINT = "createUser"

# # Define the payload (data) as a dictionary
# payload = {
#     'role': 'Teacher',
#     'firstName': 'Robert',
#     'lastName': 'Simpson',
#     'email': 'robert23@gmail.com',
#     'password': 'x7n937cdoen@'
# }

# # Send the POST request
# response = requests.post(BASE_URL + ENDPOINT, json=payload)

# # Print the response content
# print(response.json())
