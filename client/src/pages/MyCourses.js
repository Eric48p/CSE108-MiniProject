import '../styles/MyCourses.css'
import Navbar from '../components/Navbar';
import MyCourse from '../components/MyCourse';

function MyCourses(){
  const role = 'Student'

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
            <MyCourse  userRole={role}/>
            <MyCourse  userRole={role}/>
            <MyCourse  userRole={role}/>
            <MyCourse  userRole={role}/>

          </table>
        </div>
      </div>
    </div>
  );
}

export default MyCourses;