import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import CharacterForm from '../../components/CharacterForm'
export default function EditPage(props) {
    const state = useSelector(state => state);

    const { username, email, img, bio } = state.user
    const editUserFormHandler = (e) => {
        e.preventDefault();
        let allInputs = document.querySelectorAll("input")
        let updatedUser = {
            email: allInputs[0].value.trim(),
            bio: document.getElementById("edit-bio").value.trim(),
            img: allInputs[1].value.trim()
        }
        console.log(updatedUser)
        //axios call here
    }
    const requiredFields = (e) => {
        if (!e.target.value.length) {
            alert("User must have an Email!")
            e.target.value = email
        }
    }
    return (
        <div>
            <h1>{props.editType}</h1>
            {props.editType === "User" ? <form onSubmit={(e)=>{editUserFormHandler(e)}}>
                <label htmlFor="edit-email">Email</label>
                <input id="edit-email" onBlur={requiredFields} defaultValue={email} />
                <label htmlFor="edit-bio">Bio</label>
                <textarea id="edit-bio" defaultValue={bio}></textarea>
                <label htmlFor="edit-img">Image</label>
                <input type="file" id="edit-img" defaultValue={img} />
                <button onClick={(e)=>{editUserFormHandler(e)}}>Submit</button>
            </form>
                : <CharacterForm edit={true} />}
        </div>
    )
}