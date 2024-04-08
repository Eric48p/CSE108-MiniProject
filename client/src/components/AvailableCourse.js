import React, { useState, useEffect } from "react"

export default function AvailableCourse() {
  const [allcourses, setAllCourses] = useState([])
  const [studentCourses, setStudentCourses] = useState([])

  // Logged in user info
  const [user, setUser] = useState("")
  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])


  // Gets all courses
  useEffect(() => {
    fetch("http://localhost:5000/allCourses")
      .then((response) => response.json())
      .then((data) => setAllCourses(data))
      .catch((error) => console.error("Error fetching data:", error))
  }, []) // Empty dependency array to ensure the effect runs only once


  // Gets all courses that the logged in user is enrolled in
  useEffect(() => {
    fetch(`http://localhost:5000/studentCourses?id=${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers if required
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
        // Handle errors from the GET request
      })
  }, [user.id]) // Include studentId in the dependency array to trigger the effect when it changes

  // Registers a student for a course
  const handleRegister = (courseName) => {
    const registerData = {
      courseName: courseName,
      email: user.email,
    }

    console.log("Register Data:", registerData)

    fetch("http://localhost:5000/enrollStudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((data) => {
        console.log("Success Response:", data)
        window.location.reload()
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }

  // Drops a student from a course
  const handleDrop = (courseName) => {
    const dropData = {
      courseName: courseName,
      email: user.email,
    };
  
    console.log('Drop Data:', dropData);
  
    fetch("http://localhost:5000/dropCourse", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dropData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success Response:", data);
        window.location.reload(); // Reload the page after dropping the course
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  

  return (
    <tbody>
      {allcourses.map((course) => (
        <tr key={course.id}>
          <td>{course.courseName}</td>
          <td>{course.teacher}</td>
          <td>{course.courseTime}</td>
          <td>
            {course.totalEnrolled} / {course.capacity}
          </td>
          <td>
            {studentCourses.some((studentCourse) => studentCourse.courseName === course.courseName) ? (
              <button onClick={() => handleDrop(course.courseName)} className="drop-button">-</button>
            ) : course.totalEnrolled === course.capacity ? (
              <p>Full</p>
            ) : (
              <button onClick={() => handleRegister(course.courseName)} className="register-button">+</button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  )
}
