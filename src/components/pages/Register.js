import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../odsApi';

const Register = () => {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <form className='login-form text-center'>
        <h1 className='mb-5 font-weight-light'>Register</h1>
        <div className='form-group'>
          <p>Please fill in this form to create an account.</p>
          <label htmlFor='email'>
            <b>Email</b>
          </label>
          <input
            type='text'
            placeholder='Enter Email'
            name='email'
            className='form-control rounded-pill form-control-lg'
            required
          />
          <label htmlFor='psw'>
            <b>Password</b>
          </label>
          <input
            type='password'
            placeholder='Enter Password'
            name='psw'
            className='form-control rounded-pill form-control-lg'
            required
          />
          <label htmlFor='psw-repeat'>
            <b>Repeat Password</b>
          </label>
          <input
            type='password'
            placeholder='Repeat Password'
            name='psw-repeat'
            className='form-control rounded-pill form-control-lg'
            required
          />
          <p>
            By creating an account you agree to our{' '}
            <a href='# '>Terms &amp; Privacy</a>.
          </p>
          <button type='submit' className='registerbtn'>
            Register
          </button>
        </div>
        <div className='container signin'>
          <p>
            Already have an account?{' '}
            <li className=''>
              <Link to={routes.PAGE_SIGN_IN}>
                <strong>Sign in</strong>
              </Link>
            </li>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
