import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'

export default function CharacterForm(props) {
    const state = useSelector(state => state);
    const [editCharacter, setEditCharacter] = useState()
    useEffect(() => {
        if (props.edit) {
            setEditCharacter(state.singleCharacter)
        }
    }, [])
    let { firstName, lastName, age, franchise, description } = editCharacter ? editCharacter : ""

    const characterFormHandler = (e) => {
        e.preventDefault();
        let allInputs = document.querySelectorAll("input")
        let characterData = {
            firstName: allInputs[0].value.trim(),
            lastName: allInputs[1].value.trim(),
            age: allInputs[2].value.trim(),
            franchise: allInputs[3].value.trim(),
            description: allInputs[4].value.trim()
        }
        console.log(characterData)
        //axios call here
    }
    const requiredFields = (e) => {
        if (!e.target.value.length) {
            alert("Character Must have a name!")
        }
    }
    return (
        <div>
            <form id="characterForm" type="submit" onSubmit={(e) => { characterFormHandler(e) }}>
                <label htmlFor="characterFirstName">First Name</label>
                <input id="characterFirstName" onBlur={requiredFields} defaultValue={editCharacter ? firstName : null} />
                <label htmlFor="characterLastName">Last Name</label>
                <input id="characterLastName" onBlur={requiredFields} defaultValue={editCharacter ? lastName : null} />
                <label htmlFor="characterAge">Age</label>
                <input id="characterAge" defaultValue={editCharacter ? age : null} />
                <label htmlFor="characterFranchise">Franchise</label>
                <input id="characterFranchise" defaultValue={editCharacter ? franchise : null} />
                <label htmlFor="characterDescription">Description</label>
                <input id="characterDescription" defaultValue={editCharacter ? description : null} />
                <button onClick={(e) => { characterFormHandler(e) }}>Submit</button>
                {/* characterImg
               characterRace
               characterClass
               characterVisibleName
               characterLookingFor
               characterEra
               characterXRated */}


            </form>
        </div>
    )
}