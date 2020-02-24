import React, { useState, useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
import { Link } from 'react-router-dom';
import { routes } from '../../odsApi';
import AuthContext from '../../context/auth/authContext';

const Register = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { register, getOtp } = authContext;

  const [otpToken, setOtpToken] = useState({
    otp: ''
  });

  const [user, setUser] = useState({
    fullname: '',
    email: '',
    password: '',
    password2: ''
  });

  const { fullname, email, password, password2 } = user;
  const { otp } = otpToken;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onChangeOtp = e =>
    setOtpToken({ ...otpToken, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (fullname === '' || email === '' || password === '') {
      setAlert('All field must be entered', 'danger');
    } else if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      getOtp(user);
    }
  };

  const onSetOtp = e => {
    e.preventDefault();
    // register({
    //   user: {
    //     email,
    //     password,
    //     fullname
    //   },
    //   otpToken
    // });
    register();
  };

  return (
    <div className='d-flex justify-content-center align-items-center'>
      <form className='login-form text-center' onSubmit={onSubmit}>
        <h1 className='mb-5 font-weight-light'>Register</h1>
        <div className='form-group'>
          <p>Please fill in this form to create an account.</p>
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
          <label htmlFor='otp'>
            <b>OTP</b>
          </label>
          <input
            type='text'
            placeholder='Enter OTP'
            name='otp'
            value={otp}
            onChange={onChangeOtp}
            className='form-control rounded-pill form-control-lg'
          />
          {/* <p>
            By creating an account you agree to our{' '}
            <a href='# '>Terms &amp; Privacy</a>.
          </p> */}
          <button type='submit' className='registerbtn'>
            Register
          </button>
          <button className='registerbtn' onClick={onSetOtp}>
            OTP
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
