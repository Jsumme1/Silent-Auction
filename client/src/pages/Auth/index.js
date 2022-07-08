import { React, useState } from "react";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { LOGIN, SIGN_UP } from '../../utils/actions';
import API from '../../utils/API';
import { useDispatch, useSelector } from 'react-redux';
import './auth.css'
export default function Auth() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || '/';
    const [loginFormStatus, setLoginFormStatus] = useState(true)
    const formSubmit = async (e) => {
        e.preventDefault();
        if (loginFormStatus) {
            const creds = {
                username: document.getElementById("email").value.trim(),
                password: document.getElementById("password").value.trim()
            }

            const axiosres = await API.login(creds)
            if (axiosres.status === 200) {
                dispatch({
                    type: LOGIN,
                    payload: axiosres.data
                });
           
                navigate(from, { replace: true });
            } else {
                console.log("wrong credentials!")
            }
        } else {
            const newPass = document.getElementById("password").value.trim()
            const confirmPass = document.getElementById("confirm-pass").value.trim()
            if (newPass !== confirmPass) {
                alert("passwords must match")
            } else {
                const creds = {
                    email: document.getElementById("email").value.trim(),
                    password: newPass,
                    username: document.getElementById("username").value.trim(),
                }
                const res = await API.signup(creds)
                if (res.status === 200) {
                    dispatch({
                        type: SIGN_UP,
                        payload: res.data
                    });
                    navigate(from, { replace: true });
                } else {
                    alert("something went wrong!")
                }
                alert("sign up!")
            }
        }
    }

    return (
        <div id="authPg">
            {loginFormStatus ? <h2>Login</h2> : <h2>Sign-up</h2>}
            <form onSubmit={(e) => formSubmit(e)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" />
                </div>
                {!loginFormStatus ? <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" />
                </div> : ""}
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </div>
                {!loginFormStatus ? <div>
                    <label htmlFor="confirm-pass">Confirm Password</label>
                    <input type="password" id="confirm-pass" />
                </div> : ""}
                <button >Submit</button>
                <div id="authLinks">
                    {loginFormStatus ? <a onClick={(e) => { e.preventDefault(); setLoginFormStatus(false) }}>sign-up?</a> : <a onClick={(e) => { e.preventDefault(); setLoginFormStatus(true) }}>log-in?</a>}
                    <Link to="/forgot-password">forgot password?</Link>
                </div>
            </form>
        </div>
    )
}