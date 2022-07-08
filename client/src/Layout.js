import { React, useEffect, useState } from "react";
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import { LOGOUT, LOGIN } from './utils/actions';
import API from './utils/API';
import { useDispatch } from 'react-redux';
import './App.css';
export default function Layout() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const [loading, setLoading] = useState(true)
    const logoutUser = async () => {
        let res = await API.logout()
        res = { status: 200 }
        if (res.status === 200) {
            dispatch({
                type: LOGOUT
            })
        } else {
            alert("something went wrong!")
        }
    }
    useEffect(() => {
        let verifyUser = async () => {
            let res = await API.check_status()
            console.log(res)
            if (res?.status === 200 && res?.data !== {} ) {
                dispatch({
                    type: LOGIN,
                    payload: res.data
                });
            }
            setLoading(false)
        }
        verifyUser()
    }, [])
    return (
        <div id="layout-container">
            <nav>
                <ul id="nav-bar">
                    <li>
                        <Link to="/">About</Link>
                    </li>
                    {state.auth
                        ? <>
                            <li><Link to="/search">Search</Link></li>
                            <li><Link to={"/" + state.user?.username}>Profile</Link></li>
                            <li><Link to="/messages">Messages</Link></li>
                            <li onClick={(e) => { e.preventDefault(); logoutUser() }}><Link to="/">Logout</Link></li>
                        </>
                        : <li><Link to="/login">Login</Link></li>
                    }
                </ul>
            </nav>
            {loading ? <p>Loading...</p> : <Outlet />}
        </div>
    );
}