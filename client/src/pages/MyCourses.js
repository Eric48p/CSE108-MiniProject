import '../styles/MyCourses.css'
import Navbar from '../components/Navbar';
import MyCourse from '../components/MyCourse';
import { useEffect, useState } from 'react';

function MyCourses(){
  const [user, setUser] = useState('');
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return(
    <div className="MyCourses-container">
      <Navbar />
      <div className="MyCourses-background">
        <div className='courses-table-background'>
          <table className='courses-table'>
            <tr>
              <th>Course Name</th>
              <th>Instructor</th>
              <th>Time</th>
              <th>Total Enrolled</th>
            </tr>
            <MyCourse  userRole={user.role}/>

          </table>
        </div>
      </div>
    </div>
  );
}

export default MyCourses;