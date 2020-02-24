import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../odsApi';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log('Login');
  };

  return (
    <div className='d-flex justify-content-center align-items-center login-container'>
      <form className='login-form text-center' onSubmit={onSubmit}>
        <h1 className='mb-5 font-weight-light'>Login</h1>
        <div className='form-group'>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            className='form-control rounded-pill form-control-lg'
            placeholder='Email'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            className='form-control rounded-pill form-control-lg'
            placeholder='Password'
          />
        </div>
        <div className='forgot-link form-group d-flex justify-content-between align-items-center'>
          <div className='form-check'>
            <input type='checkbox' className='form-check-input' id='remember' />
            <label className='form-check-label' htmlFor='remember'>
              Remember Password
            </label>
          </div>
          <a href='# '>Forgot Password?</a>
        </div>
        <button
          type='submit'
          className='btn mt-5 rounded-pill btn-lg btn-custom btn-block text-uppercase'
        >
          Log in
        </button>
        <p className='mt-3 font-weight-normal'>
          Don't have an account?{' '}
          <li className=''>
            <Link to={routes.PAGE_REGISTER}>
              <strong>Sign up</strong>
            </Link>
          </li>
        </p>
      </form>
    </div>
  );
};

export default Login;
