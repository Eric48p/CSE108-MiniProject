import '../styles/AvailableCourses.css'
import Navbar from '../components/Navbar';
import AvailableCourse from '../components/AvailableCourse';

function AvailableCourses(){

  return(
    <div className="AvailableCourses-container">
      <Navbar />
      <div className="AvailableCourses-background">
        <div className='AvailableCourses-table-background'>
          <table className='AvailableCourses-table'>
            <tr>
              <th>Course Name</th>
              <th>Instructor</th>
              <th>Time</th>
              <th>Total Enrolled</th>
              <th>Register</th>
            </tr>
            <AvailableCourse />
          </table>
        </div>
      </div>
    </div>
  );
}

export default AvailableCourses;