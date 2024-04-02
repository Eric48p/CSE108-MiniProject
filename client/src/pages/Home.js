import '../styles/Home.css'
import Navbar from '../components/Navbar';
import MyCourse from '../components/MyCourse';

function Home(){

  return(
    <div className="home-container">
      <Navbar />
      <div className="home-background">
        <div className='courses-table-background'>
          <table className='courses-table'>
            <tr>
              <th>Course Name</th>
              <th>Instructor</th>
              <th>Time</th>
              <th>Total Enrolled</th>
            </tr>
            <MyCourse />
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;