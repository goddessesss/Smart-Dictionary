import React, { useState } from 'react';

export default function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleMode = () => {
    setIsLoginMode(prevMode => !prevMode);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <div className="container mt-5">
        <div style={{textAlign: 'center', fontSize:'30px', fontWeight:'500'}}> 
          {isLoginMode ? <div>Login</div> : <div>Registration</div>}
        </div>
        <form style={{ boxShadow: 'none' }}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          {!isLoginMode && (
            <div className="mb-3">
              <label htmlFor="exampleInputUsername1" className="form-label">Username</label>
              <input type="text" className="form-control" id="exampleInputUsername1" />
            </div>
          )}
          <button type="submit" style={{width:"100%", marginBottom:"15px"}} className="btn btn-primary">{isLoginMode ? 'Login' : 'Register'}</button>
        </form>
        <p style={{textAlign:"center"}}> {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          <a href="#" onClick={toggleMode}>
            {isLoginMode ? "Register here" : "Login here"}
          </a>
        </p>
      </div>
    </div>
  );
}
