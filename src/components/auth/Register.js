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
    <div className='d-flex justify-content-center align-items-center login-content' style={{minHeight: '90vh'}}>
      {!isOtp && (
        <form className='login-form' onSubmit={onSetOtp} style={{margin: '25px auto'}} >
          <h2 style={{marginBottom: '5px', padding: '10px 0 5px'}}>Tạo tài khoản</h2>
          <div className='form-group'>
            {/* <p>Please fill in this form to create an account.</p> */}
            <label htmlFor='email' style={{margin: '3px 0 0'}}>
              <b>Email</b>
            </label>
            <input
              type='email' placeholder='Nhập email' name='email' 
              value={email} onChange={onChange}
              className='form-control'
              required
            />
            <label htmlFor='name' style={{margin: '3px 0 0'}}>
              <b>Họ tên</b>
            </label>
            <input
              type='text'
              placeholder='Nhập họ tên'
              name='fullname'
              value={fullname}
              onChange={onChange}
              className='form-control'
              required
            />
            <label htmlFor='psw' style={{margin: '3px 0 0'}}>
              <b>Mật khẩu</b>
            </label>
            <input
              type='password'
              placeholder='Nhập mật khẩu'
              name='password'
              value={password}
              onChange={onChange}
              className='form-control'
              required
              minLength='6'
            />
            <label htmlFor='psw-repeat' style={{margin: '3px 0 0'}}>
              <b>Nhập lại mật khẩu</b>
            </label>
            <input
              type='password'
              placeholder='Nhập lại mật khẩu'
              name='password2'
              value={password2}
              onChange={onChange}
              className='form-control'
              required
              minLength='6'
            />

            <input type='submit' value='Register' className='registerbtn' />
          </div>
          <div className='container signin  text-center'>
            <p>
              Bạn đã có tài khoản?
              <li className=''>
                <Link to={routes.PAGE_SIGN_IN}>
                  <strong>Đăng nhập</strong>
                </Link>
              </li>
            </p>
          </div>
        </form>
      )}
      {isOtp && (
        <form className='login-form text-center' onSubmit={onSubmit} >
          <label htmlFor='name' style={{margin: '3px 0 0'}}>
            <b>Nhập mã OTP</b>
          </label>
          <input
            type='text' placeholder='Mã OTP' name='otpToken'
            value={otpToken} onChange={onChange}
            className='form-control'
            required
          />
          <button className='registerbtn'>Xác nhận</button>
        </form>
      )}
    </div>
  );
};

export default Register;
