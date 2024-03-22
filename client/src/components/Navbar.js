import '../styles/Navbar.css'
import ucmLogo from '../images/UCM-logo.png'
import { useState } from 'react';


export default function Navbar (){
  // State to track if the dropdown is open or closed
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle the dropdown state
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="nav">
      <div className='nav-spacer' style={{alignItems: "center"}}>
        <a href='/Home'>
          <img src={ucmLogo} className='mercedLogo' ></img>
        </a>
      </div>
      <div className='nav-spacer' style={{alignItems: "center", justifyContent: "center"}}>
        <ul>
          <a href='/Home'>
            <li>My Courses</li>
          </a>
          <a href='/Home'>
            <li>Available Courses</li>
          </a>
        </ul>
      </div>
      <div className='nav-spacer' style={{alignItems: "center", justifyContent: "end"}}>
        <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          <p className='nav-greeting'>Hello, "NAME"</p>
          {dropdownOpen && (
            <div className="dropdown-content">
              <a href="/">Sign Out</a>
            </div>
          )}
        </div>
      </div>  
    </nav>
  )
}