import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, clearError } from '../../store/account';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';



const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { account, status, error } = useSelector(state => state.account);

  const emailRef = useRef();
  const errRef = useRef();

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  // focus the email field on mount
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // once we have an account, send them to the dashboard
  useEffect(() => {
    if (account) {
      navigate('/dashboard');
    }
  }, [account, navigate]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginAsync({ loginId, password }));
  };

  const isLoading = status === 'loading';

  return (
    <>
      <div className={styles.page}>
        <div className={styles.topBar}></div>

        <section className={styles.content}>
          <img className={styles.logo} alt="" src="/LogoThickDark.svg" />
          <h1 className={styles.title}>Let's get started.</h1>

          <form onSubmit={handleSubmit}>
            <p
              ref={errRef}
              className={error ? styles.errmsg : styles.offscreen}
              aria-live="assertive"
            >
              {error}
            </p>

            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => {
                setLoginId(e.target.value)
                dispatch(clearError());
              }}
              value={loginId}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value)
                dispatch(clearError());
              }}
              value={password}
              required
            />


            <div className={styles.checkboxContainer}>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>

            <button
              type="submit"
              className={loginId && password ? styles.activeBtn : styles.inactiveBtn}
              disabled={!(loginId && password)}
            >
              Login
            </button>

            <span className={styles.link}>
              <a href="#">Having trouble logging in? </a>
            </span>
          </form>
        </section>

        <div className={styles.bottomBar}></div>
      </div>
    </>
  );
};

export default Login;

