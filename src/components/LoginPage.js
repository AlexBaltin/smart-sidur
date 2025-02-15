import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/smartsidur-page.css'; 



const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // getting error from the redux
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (login === 'admin' && password === 'admin123') {
      // succsess
      dispatch(loginSuccess({ name: 'Alex' }));
      navigate('/smartsidur');
    } else {
      // error in auth
      dispatch(loginFailure('Incorrect username or password'));
    }
  };

  return (
      <div className='login-panel'>
        <h1>Welcome to SmartSidur</h1>
        <h3>Please log in:</h3>

        {error && <div className="error">{error}</div>}
  
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username or email"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Let's go!</button>
      </form>
      </div>
  );
  
};

export default LoginPage;
