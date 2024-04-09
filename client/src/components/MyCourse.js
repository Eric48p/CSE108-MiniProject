import React, { useState, useEffect } from 'react';

export default function MyCourse ({userRole}){
  const [courses, setCourses] = useState([]);
  const [studentCourses, setStudentCourses] = useState([])

  const [user, setUser] = useState('');
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Gets all courses a teacher teaches
  useEffect(() => {
    if (userRole === 'teacher' && user.firstName && user.lastName) {
      fetch(`http://localhost:5000/teacherCourses?firstName=${user.firstName}&lastName=${user.lastName}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setCourses(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [userRole, user.firstName, user.lastName]);

  // Gets all courses that the logged in user is enrolled in
  useEffect(() => {
    fetch(`http://localhost:5000/studentCourses?id=${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((data) => {
        setStudentCourses(data) // Update state with courses data
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }, [user.id]) // Include studentId in the dependency array to trigger the effect when it changes

  if (userRole === 'teacher'){
    return(
      // This component will be filled with relevant information about the classes you teach
      <tbody>
        {courses.map((course) => (
          <tr key={course.id}>
            <td><a href={`/StudentsInCourse/${course.id}`}>{course.courseName}</a></td>
            <td>{course.teacher}</td>
            <td>{course.courseTime}</td>
            <td>{course.totalEnrolled} / {course.capacity}</td>
          </tr>
        ))}
      </tbody>
  )}
  else if (userRole === 'student'){
    return(
      // This component will be filled with relevant information about the classes you're enrolled in
      <tbody>
          {studentCourses.map((course) => (
            <tr key={course.id}>
              <td>{course.courseName}</td>
              <td>{course.teacher}</td>
              <td>{course.courseTime}</td>
              <td>{course.totalEnrolled} / {course.capacity}</td>
            </tr>
          ))}
        </tbody>
    )
  }
}