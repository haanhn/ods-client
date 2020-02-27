import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import { Link } from 'react-router-dom';
import { routes } from '../../odsApi';
import AuthContext from '../../context/auth/authContext';
import './login.css';

const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const {
    register,
    getOtp,
    isOtp,
    error,
    clearErrors,
    isAuthenticated
  } = authContext;

  useEffect(() => {
    if (error === 'Email has been already used' || error === 'Invalid OTP') {
      setAlert(error, 'danger');
      clearErrors();
    } else if (isAuthenticated) {
      props.history.push('/login');
    }
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    fullname: '',
    email: '',
    password: '',
    password2: '',
    otpToken: ''
  });

  const { fullname, email, password, password2, otpToken } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    register({
      user: {
        email,
        password,
        fullname
      },
      otpToken
    });
  };

  const onSetOtp = e => {
    e.preventDefault();
    if (fullname === '' || email === '' || password === '') {
      setAlert('All field must be entered', 'danger');
    } else if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else if (password.length < 6 || password2.length < 6) {
      setAlert('Password must has at least 6 characters');
    } else {
      getOtp(user);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center login-content'>
      {!isOtp && (
        <form className='login-form text-center' onSubmit={onSetOtp}>
          <h1 className='mb-5 font-weight-light'>Register</h1>
          <div className='form-group'>
            {/* <p>Please fill in this form to create an account.</p> */}
            <label htmlFor='email'>
              <b>Email</b>
            </label>
            <input
              type='email'
              placeholder='Enter Email'
              name='email'
              value={email}
              onChange={onChange}
              className='form-control rounded-pill form-control-lg'
              required
            />
            <label htmlFor='name'>
              <b>Name</b>
            </label>
            <input
              type='text'
              placeholder='Enter Name'
              name='fullname'
              value={fullname}
              onChange={onChange}
              className='form-control rounded-pill form-control-lg'
              required
            />
            <label htmlFor='psw'>
              <b>Password</b>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              value={password}
              onChange={onChange}
              className='form-control rounded-pill form-control-lg'
              required
              minLength='6'
            />
            <label htmlFor='psw-repeat'>
              <b>Repeat Password</b>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              name='password2'
              value={password2}
              onChange={onChange}
              className='form-control rounded-pill form-control-lg'
              required
              minLength='6'
            />

            {/* <p>
            By creating an account you agree to our{' '}
            <a href='# '>Terms &amp; Privacy</a>.
          </p> */}
            <input type='submit' value='Register' className='registerbtn' />
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
      )}
      {isOtp && (
        <form className='login-form text-center' onSubmit={onSubmit}>
          <label htmlFor='name'>
            <b>Name</b>
          </label>
          <input
            type='text'
            placeholder='Enter OTP'
            name='otpToken'
            value={otpToken}
            onChange={onChange}
            className='form-control rounded-pill form-control-lg'
            required
          />
          <button className='registerbtn'>OK</button>
        </form>
      )}
    </div>
  );
};

export default Register;
