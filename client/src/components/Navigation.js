import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from '../pages/Login';
import CreateAccount from '../pages/CreateAccount';
import MyCourses from '../pages/MyCourses';
import AvailableCourses from '../pages/AvailableCourses';

function Navigation() {

  return (
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/MyCourses" element={<MyCourses />} />
          <Route path="/AvailableCourses" element={<AvailableCourses />} />
      </Routes>
  );
}

export default Navigation;