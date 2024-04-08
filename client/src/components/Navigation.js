import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import CreateAccount from '../pages/CreateAccount';
import MyCourses from '../pages/MyCourses';
import AvailableCourses from '../pages/AvailableCourses';
import CreateCourse from '../pages/CreateCourse';
import StudentsInCourse from '../pages/StudentsInCourse';

function Navigation() {

  return (
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/MyCourses" element={<MyCourses />} />
          <Route path="/AvailableCourses" element={<AvailableCourses />} />
          <Route path="/CreateCourse" element={<CreateCourse />} />
          <Route path="/StudentsInCourse/:id" element={<StudentsInCourse />} />
      </Routes>
  );
}

export default Navigation;