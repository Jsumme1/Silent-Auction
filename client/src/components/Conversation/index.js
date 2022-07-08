//img if not group chat
//other persons username  || name 
// list of persons if group chat
import React from 'react';
import './conversation.css';
import { useSelector } from 'react-redux';
export default function Conversation(props) {
    //this will work for users but not characters
    const state = useSelector(state => state);
    const handleConversationClick =(e)=>{
        e.preventDefault();
        let active = state.user.conversations.filter(conversation => {
            if(conversation.id == e.currentTarget.id){
                return conversation
            }
        })
        document.querySelectorAll(".conversation-container").forEach(convo =>{
            convo.setAttribute("class", "conversation-container")
        })
        e.currentTarget.setAttribute("class", "active-convo conversation-container")
        props.changeMessagesPresented(active[0])
    }
    return (
        <div className={props.id === props.activeid? "active-convo conversation-container":"conversation-container"} id={props.id} onClick={(e)=>{handleConversationClick(e)}} >
            {props.users.length === 1 ? <>
                <img src={props.users[0].img} />
                <p>@{props.users[0].username}</p>
            </> : <p>{props.users.join(", @")}</p>}
        </div>
    )
}