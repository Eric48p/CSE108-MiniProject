import '../styles/Login.css';
import loginImage from '../images/SUNP-UCMerced.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoginNavbar from '../components/Navbar';


function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
        ...loginData,
        [name]: value,
    });
  };

  const handleLogin = () => {
    if (loginData.email.trim() !== '' && loginData.password.trim() !== '') {
      console.log('Email:', loginData.email.toLowerCase());
      console.log('Password:', loginData.password);
    } else {
      alert('Email or Password Incorrect.')
      console.log('Email or password is empty');
    }
  };

  const handleCreateAccountClick = () => {
    navigate('/CreateAccount'); // Navigate to the CreateAccount page
  };

  return (
    <div className='login-container'>
      <LoginNavbar />
      <div className="login-background">
        <div className='login-image-box'>
          <img src={loginImage} className='login-image'></img>
        </div>
        <div className='login-form-box'>
          <form className='login-form'>
            <h1>Student Portal</h1>
            <p>University of California, Merced</p>
            <div className='user-box'>
              <input type='text' required value={loginData.email} name='email' onChange={handleInputChange} />
              <label>Email Address</label>
            </div>
            <div className='user-box'>
              <input type='password' required value={loginData.password} name='password' onChange={handleInputChange} />
              <label>Password</label>
            </div>
            <div>
              <button type="button" className='login-button' onClick={handleLogin}>Login</button>
              <button className='create-account-button' onClick={handleCreateAccountClick}>Create Account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
  );
}

export default Login;
