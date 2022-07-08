import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./message_board.css";
import Conversation from "../../components/Conversation";
import Message from "../../components/Message";

export default function MessageBoard() {
    const state = useSelector(state => state);
    //might want to make this a global state in redux
    const conversations = state.user.conversations?state.user.conversations:[]
    const [activeConversation, setActiveConversation] = useState(conversations)
    const handleMessage = async (e) => {
        e.preventDefault();
        let message = e.target.previousSibling.value
        console.log(message, activeConversation.users[0].id, state.user.id)
        document.getElementById("usersMsg").value = ""
        //then call axios here
    }
    const changeMessagesPresented = (newConversation) => setActiveConversation(newConversation)

    return (
        <section id="message-board">
            <aside id="conversations">
                <div>
                    <p>You are current looking at ... Message Board</p>
                    <p>You can switch Message Boards here:</p>
                    <select>
                        {/* map <option>{name}</option> --username, then their character names here */}
                    </select>
                </div>
                {/* future dev set up a way to search messages here */}
                {/*map Conversation components here 10 at first then 'load all' button)*/}
                {state.user.conversations?.map(conversation => {
                    return <Conversation users={conversation.users}
                        id={conversation.id}
                        activeid={activeConversation.id}
                        changeMessagesPresented={changeMessagesPresented} />
                })}
            </aside>
            <main>
                <div id="current-messages">
                    {/*map Message components here */}
                    {activeConversation.messages?.map(message =>{
                        return <Message user={message.user} message={message.message} createdAt={message.createdAt}/>
                    })}
                </div>
                <form id="message-form" onSubmit={(e) => handleMessage(e)}>
                    <textarea  id="usersMsg"></textarea>
                    <button onClick={(e) => handleMessage(e)}>Send</button>
                </form>
            </main>
        </section>
    )
}