import '../styles/CreateAccount.css'
import LoginNavbar from '../components/LoginNavbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateAccount() {
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState({
    role: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAccountData({
        ...accountData,
        [name]: value,
    });
  };

  const handleCreate = () => {
    if (
      accountData.role === '' ||
      accountData.firstName === '' ||
      accountData.lastName === '' ||
      accountData.email === '' ||
      accountData.password === '' ||
      accountData.confirmPassword === ''
    ) {
      alert('Please fill in all required fields.');
    } else if (accountData.password !== accountData.confirmPassword) {
      alert('Passwords do not match.');
    } else {
      setAccountData((prevData) => ({
        ...prevData,
        password: accountData.password, // Update password in accountData
      }));
      // console.log('Creating account:', accountData);
      fetch("http://localhost:5000/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          console.log(accountData);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      // navigate('/'); // Redirect to login page after successful account creation
    }
  };



  return (
    <div className="create-account-container">
      <LoginNavbar />
      <div className="create-account-background">
        <form className='create-account-form'>
          <div className='form-row' style={{ height: '70%' , justifyContent: 'center', alignItems: 'center'}}> {/* Create Account Header */}
            <h1>Create Account</h1>
          </div>
          <div className='form-row'> {/* Role Selection */}
            <select required value={accountData.role} onChange={handleInputChange} name='role'>
              <option value=''>Select Role</option>
              <option value='student' >Student</option>
              <option value='teacher'>Teacher</option>
              <option value='admin'>Admin</option>
            </select>
          </div>
          <div className='form-row'> {/* Name Input */}
            <input type='text' name='firstName' placeholder='First' required value={accountData.firstName} onChange={handleInputChange}/>
            <input type='text' name='lastName' placeholder='Last'required value={accountData.lastName} onChange={handleInputChange}/>
          </div>
          <div className='form-row'> {/* Email Input */}
            <input type='email' name='email' placeholder='Email'required value={accountData.email.toLowerCase()} onChange={handleInputChange}/>
          </div>
          <div className='form-row'> {/* Password Input */}
            <input type='password' name='password' placeholder='Password'required value={accountData.password} onChange={handleInputChange}/>
          </div>
          <div className='form-row'> {/* Confirm Password Input */}
            <input type='password' name='confirmPassword' placeholder='Confrim Password' required value={accountData.confirmPassword} onChange={handleInputChange}/>
          </div>
          <div className='form-row'> {/* Create Button */}
            <button type="button" className='create-button' onClick={handleCreate}>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
