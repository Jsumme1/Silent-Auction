//if state.user.id === message.user.id then className="myMsg" color x float right
//else className="theirMsg" color y float left
import React from 'react';
import { useSelector } from 'react-redux';
import './message.css'
export default function Message(props) {
    const state = useSelector(state => state);
    return (
        <div className={props.user.id === state.user.id ? "myMsg msgCard": "theirMsg msgCard"}>
            <p className={props.user.id === state.user.id ? "mine msgText": "theirs msgText"}>{props.message}</p>
            <p className="msgTime">{props.createdAt}</p>
        </div>
    )
}