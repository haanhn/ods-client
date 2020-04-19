import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { routes, localStoreKeys } from '../../odsApi';
import AuthContext from '../../context/auth/authContext';
const Login = props => {
  const authContext = useContext(AuthContext);
  const { login } = authContext;

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const token = localStorage.getItem(localStoreKeys.token);

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await login({
      user: { email, password }
    });
    if (result === false) {
      alert('Tên đăng nhập hoặc mật khẩu sai, xin thử lại.');
    } else if (result === true) {
      props.history.push('/');
    }
  };
  
  if (token) {
    props.history.push('/');
  }

  return (
    <div className='d-flex justify-content-center align-items-center login-container login-content'>
      <form className='login-form text-center' onSubmit={onSubmit}>
        <h2 style={{marginBottom: '5px', padding: '10px 0 25px'}} >Đăng nhập</h2>
        <div className='form-group'>
          <input
            type='email' name='email' value={email} onChange={onChange}
            className='form-control rounded-pill' style={{marginBottom: '0'}}
            placeholder='Email'
            required
          />
        </div>
        <div className='form-group'>
          <input type='password' name='password' value={password} onChange={onChange}
            className='form-control rounded-pill' style={{marginBottom: '0'}}
            placeholder='Mật khẩu' required
          />
        </div>

        <button type='submit' 
          className='btn rounded-pill btn-custom btn-block text-uppercase' style={{marginTop: '15px'}} >
          Đăng nhập
        </button>

        <p className='mt-3 font-weight-normal'>
          Bạn chưa có tài khoản?
          <li>
            <Link to={routes.PAGE_REGISTER}>
              <strong>Tạo tài khoản</strong>
            </Link>
          </li>
        </p>
      </form>
    </div>
  );
};

export default Login;
