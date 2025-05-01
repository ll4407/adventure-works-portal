import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  // So we can set the focus on the input field when the component loads
  const emailRef
   = useRef();
  // Sets the focus on the errors when an error occurs.
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  // Corresponds to an error that we might get back when we try to authenticate.
  const [errMsg, setErrMsg] = useState("");

  // We apply useEffect twice. The first time we set the focus on the input field when the component loads. There is nothing in the dep array so it only runs once.
  useEffect(() => {
    emailRef
    .current.focus();
  }, []);

  // The second time we use useEffect we empty out the error message if the user changes the email or password state.
  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const response = await axios.post(
        "/api/Login",
        JSON.stringify({ loginId: email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(JSON.stringify(response?.data)); // Debugging: Log the response data

      // Check if the login was successful
      if (response?.data?.success) {
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({ email, pwd, roles, accessToken });
        setEmail("");
        setPwd("");
        setSuccess(true);

        // Navigate to the dashboard
        navigate("/dashboard");
      } else {
        // Handle unsuccessful login
        setErrMsg("Login Failed: Invalid credentials");
        setSuccess(false); // Ensure success is false
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <div className={styles.page}>
        <div className={styles.topBar}></div>

        <section className={styles.content}>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <img className={styles.logo} alt="" src="/LogoThickDark.svg" />
          <h1 className={styles.title}>Let's get started.</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              ref={emailRef
                
              }
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />

            <div className={styles.checkboxContainer}>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>

            <button
              type="submit"
              className={email && pwd ? styles.activeBtn : styles.inactiveBtn}
              disabled={!(email && pwd)}
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
