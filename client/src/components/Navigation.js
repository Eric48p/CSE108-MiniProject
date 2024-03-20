import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from '../pages/Login';
import CreateAccount from '../pages/CreateAccount';

function Navigation() {

  return (
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
      </Routes>
  );
}

export default Navigation;