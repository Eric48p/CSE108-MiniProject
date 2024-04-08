import '../styles/CreateCourse.css'
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateCourse(){

  const navigate = useNavigate();

  const [user, setUser] = useState('');
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const [courseData, setCourseData] = useState({
    courseName: "",
    teacher: "",
    courseTime: "",
    capacity: 0,
    totalEnroled: 0
  });

  useEffect(() => {
    if (user) {
      setCourseData(prevData => ({
        ...prevData,
        teacher: user.firstName + " " + user.lastName // Update teacher in courseData when user changes
      }));
    }
  }, [user]); // Run this effect when user changes

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const parsedValue = name === 'capacity' ? parseInt(value, 10) : value; // Parse capacity to an integer
  
    setCourseData({
      ...courseData,
      [name]: parsedValue,
    });
  };

  const handleCreate = () => {
    fetch("http://localhost:5000/createCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        console.log(courseData);
        navigate('/MyCourses');
      })
      .catch((error) => {
        // Handle the error response
          console.error("Error:", error);
          // Display the error message to the user (e.g., show in an alert or toast)
      });
  };
  

  return(
    <div className="CreateCourse-container">
      <Navbar />
      <div className="CreateCourse-background">
      <form className='CreateCourse-form'>
          <div className='CreateCourse-form-row' style={{ height: '70%' , justifyContent: 'center', alignItems: 'center'}}> {/* Create Account Header */}
            <h1>Create Course</h1>
          </div>
          <div className='CreateCourse-form-row'> {/* Course Name Input */}
            <input type='text' name='courseName' placeholder='Course Name' required value={courseData.courseName} onChange={handleInputChange}/>
          </div>
          <div className='CreateCourse-form-row'> {/* Course Time Input */}
            <input type='text' name='courseTime' placeholder='Course Time (Ex. MW 2-3 PM)'required value={courseData.courseTime} onChange={handleInputChange}/>
          </div>
          <div className='CreateCourse-form-row'> {/* Course Capacity Input */}
            <input type='number' name='capacity' placeholder='Course Capacity'required value={courseData.capacity} onChange={handleInputChange}/>
          </div>
          <div className='CreateCourse-form-row'> {/* Create Button */}
            <button type="button" className='create-button' onClick={handleCreate}>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;