import React, { useState } from 'react';
import { loginUser, registerUser } from '../http/authApi';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function AuthPage() {
  const { handleLogin } = useAuth();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleToggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let responseData;
      if (isLoginMode) {
        const userData = { username, password };
        responseData = await loginUser(userData);
        setMessage(responseData.message);
      } else {
        const userData = { username, password, email };
        responseData = await registerUser(userData);
        setMessage(responseData.message);
      }

      const token = responseData.token;
      handleLogin(token);

      window.alert(`${isLoginMode ? 'Login' : 'Registration'} successful`);

      if (isLoginMode) {
        window.location.replace('/module');
      } else {
        window.location.replace('/login');
      }
    } catch (error) {
      console.error(`Error during ${isLoginMode ? 'login' : 'registration'}:`, error);
      setError(error.response ? error.response.data.message : 'Something went wrong');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <div className="container mt-5 container-auth">
        <div style={{ textAlign: 'center', fontSize: '30px', fontWeight: '500' }}>
          {isLoginMode ? <div>Login</div> : <div>Registration</div>}
        </div>
        <form style={{ boxShadow: 'none' }} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputUsername1" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputUsername1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!isLoginMode && (
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
          )}
          <button type="submit" style={{ width: "100%", marginBottom: "15px" }} className="btn btn-primary">
            {isLoginMode ? 'Login' : 'Register'}
          </button>
        </form>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
        <p className="form-toggle" onClick={handleToggleMode} style={{textAlign:"center"}}>
          {isLoginMode ? 'Don\'t have an account?' : 'Already have an account?'}
        </p>
      </div>
    </div>
  );
}
