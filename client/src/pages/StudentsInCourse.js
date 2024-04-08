import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/StudentsInCourse.css";
import { useParams } from "react-router-dom";

function StudentsInCourseEntry() {
  const [students, setStudents] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedGrade, setEditedGrade] = useState("");
  const { id } = useParams();

  // Gets all students in a specific course
  useEffect(() => {
    fetch(`http://localhost:5000/courseStudents?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  const handleEditClick = (studentId) => {
    setEditMode(studentId);
    setEditedGrade(students.find((student) => student.id === studentId).grade);
  };

  const handleInputChange = (e) => {
    setEditedGrade(e.target.value);
  };

  // Saves grade change and updates database
  const handleSaveClick = (studentId) => {
    console.log("New grade:", editedGrade);
    fetch("http://localhost:5000/editStudentGrade", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId: studentId,
        courseId: id,
        newGrade: editedGrade, // Use editedGrade instead of tempGrade
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Handle success response
        setEditMode(null);
        window.location.reload() // Refresh the page
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <tbody>
      {students.map((student) => (
        <tr key={student.id}>
          <td>
            {student.firstName} {student.lastName}
          </td>
          <td>
            {editMode === student.id ? (
              <input
                type="text"
                value={editedGrade}
                onChange={handleInputChange}
                onBlur={() => handleSaveClick(student.id)}
              />
            ) : (
              <button
                className="edit-grade-btn"
                onClick={() => handleEditClick(student.id)}
              >
                {student.grade}%
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
}

function StudentsInCourse() {
  const { id } = useParams();
  const [courseName, setCourseName] = useState("");

  // Gets the name of the current course
  useEffect(() => {
    fetch(`http://localhost:5000/getCourseName?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCourseName(data.courseName);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  return (
    <div className="StudentsInCourse-container">
      <Navbar />
      <div className="StudentsInCourse-background">
        <h1>{courseName}</h1>
        <div className="StudentsInCourse-table-background">
          <table className="StudentsInCourse-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Grade</th>
              </tr>
            </thead>
            <StudentsInCourseEntry />
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentsInCourse;
