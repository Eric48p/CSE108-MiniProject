import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import ucmLogo from '../images/UCM-logo.png';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Add this line to get the current location

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handeCreateCourse = () => {
    navigate('/CreateCourse');
  };

  return (
    <nav className="nav">
      <div className='nav-spacer' style={{ alignItems: "center" }}>
        <a href='/MyCourses' className={location.pathname === '/MyCourses' ? 'active' : ''}>
          <img src={ucmLogo} className='mercedLogo' alt="UCM Logo"></img>
        </a>
      </div>
      <div className='nav-spacer' style={{ alignItems: "center", justifyContent: "center" }}>
        {user.role === 'student' ? (
          <ul>
            <a href='/MyCourses' className={location.pathname === '/MyCourses' ? 'active' : ''}>
              <li>My Courses</li>
            </a>
            <a href='/AvailableCourses' className={location.pathname === '/AvailableCourses' ? 'active' : ''}>
              <li>Available Courses</li>
            </a>
          </ul>
        ) : (
          <button className='create-course-btn' onClick={handeCreateCourse}>New Course</button>
        )}
      </div>
      <div className='nav-spacer' style={{ alignItems: "center", justifyContent: "end" }}>
        <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          <p className='nav-greeting'>Hello, {user.firstName}!</p>
          {dropdownOpen && (
            <div className="dropdown-content">
              <a href="/">Sign Out</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
