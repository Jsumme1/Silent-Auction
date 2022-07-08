import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';

export default function ResetPassword() {
    const [validToken, setValidToken] = useState(false)
    let paramArr = window.location.href.split('?token=')[1].split('&email=');
    let params = {
        token: decodeURIComponent(paramArr[0]),
        email: paramArr[1]
    };
    useEffect(() => {
        const validateToken = async () => {
            let res = await API.validate_token(params)

            if (res.data.showForm === true) {
                setValidToken(true)
            }
        }
        validateToken()
    }, [])
    const handleResetPassword = async (e) => {
        e.preventDefault();
        const newPass = document.getElementById("newPassword").value.trim()
        const confirmPass = document.getElementById("confirmPassword").value.trim()
        if (newPass && confirmPass) {
            if (newPass === confirmPass) {
                let user = {
                    email: params.email,
                    token: params.token,
                    password: newPass
                }
               const res = await API.update_password(user)
                    if(res.status === 200){
                        alert("password has been changed")
                        window.location.replace("/login")
                    }
            } else {
                alert("Passwords must match!")
            }
        } else {
            alert("Must confirm password!")
        }
    }
    return (
        <div>
            {!validToken ? <p>Your Token Has Expired!<br />Try again <Link to="/forgot-password">here</Link> or <Link to="/login">login</Link></p> 
               : <>
                    <h2>Password Reset</h2>
                    <form onSubmit={(e) => { handleResetPassword(e) }}>
                        <label htmlFor="newPassword">Password</label>
                        <input id="newPassword" />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input id="confirmPassword" />
                        <button>Reset Password</button>
                    </form>
                </>
            }
        </div>
    )
}