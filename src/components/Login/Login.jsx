import React from 'react'
import{ useRef, useState, useEffect, useContext} from 'react';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    // So we can set the focus on the input field when the component loads
    const userRef = useRef();
    // Sets the focus on the errors when an error occurs.
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    // Corresponds to an error that we might get back when we try to authenticate.
    const [errMsg, setErrMsg] = useState('');
    // Lets us show a sucess message.  In the future we would replace this with navigate with react-router to a page of our choice. 
    const [success, setSuccess] = useState(false);

    // We apply useEffect twice. The first time we set the focus on the input field when the component loads. There is nothing in the dep array so it only runs once.
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // The second time we use useEffect we empty out the error message if the user changes the email or password state.
    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (evt) => {
        evt.preventDefault();
    
        try {
            const response = await axios.post(
                '/api/Login',
                JSON.stringify({ loginId: email, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
    
            console.log(JSON.stringify(response?.data)); // Debugging: Log the response data
    
            // Check if the login was successful
            if (response?.data?.success) {
                const accessToken = response?.data?.accessToken;
                const roles = response?.data?.roles;
                setAuth({ email, pwd, roles, accessToken });
                setEmail('');
                setPwd('');
                setSuccess(true);
            } else {
                // Handle unsuccessful login
                setErrMsg('Login Failed: Invalid credentials');
                setSuccess(false); // Ensure success is false
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };
    

  return (
    <>
        {success ? (
            <section>
                <h1>You are logged in!</h1>
                <br />
                <p>
                    <a href="#">Go to Home</a>
                </p>
            </section>
        ) : (
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Let's get started.</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        id="email" 
                        ref={userRef}       
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

                    <button>Login</button> 
                    <span className="line"> 
                        <a href="#">Having trouble logging in? </a>  
                    </span> 
                </form>
            </section>
        )}
    </>
  )
}

export default Login