import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from '../pages/Login';
import CreateAccount from '../pages/CreateAccount';
import Home from '../pages/Home';

function Navigation() {

  return (
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/Home" element={<Home />} />
      </Routes>
  );
}

export default Navigation;