import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../odsApi';

const Login = () => {
  return (
    <div className='d-flex justify-content-center align-items-center login-container'>
      <form className='login-form text-center'>
        <h1 className='mb-5 font-weight-light'>Login</h1>
        <div className='form-group'>
          <input
            type='text'
            className='form-control rounded-pill form-control-lg'
            placeholder='Username'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
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
