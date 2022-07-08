import React from 'react';
import API from '../../utils/API';
import "./search.css";
export default function Search() {
    const searchUsers = async (searched) => {
        const { username, img} = API.get_one_user(searched)
        //is this enough or should I create a user card?? 
        let user = `<div>
       <img src="${img}"/>
       <a href="http://localhost:3000/${username}">${username}</a>
       </div>`
       document.getElementById("results"). innerHTML = user
    }
    const handleSearch = async (e) => {
        e.preventDefault();
        let searchInput = document.getElementById("search-value").value
        let searchType = document.getElementById("search-type").value
        console.log(searchInput, searchType)
        switch (searchType) {
            case "Username": searchUsers(searchInput)
            break;
            //should I have these separate or as one 'searchCharacters'?
            // case "Franchize": searchFranchize(searchInput)
            // break;
            // case "Character Name": searchCharacterName(searchInput)
            // break;
            case "Choose One": alert("Must choose a search type!")
            break;
        }
        document.getElementById("search-value").value = ""
        document.getElementById("search-type").value = "Choose One"
    }
    return (
        <section id="search">
            <div id="background-img">
                <h1>Search</h1>
                <form onSubmit={(e) => handleSearch(e)} id="searchForm">
                    <input type="text" id="search-value" />
                    <select id="search-type">
                        <option>Choose One</option>
                        <option>Character Name</option>
                        <option>Franchize</option>
                        <option>Username</option>
                    </select>
                </form>
                <p>Connect with others! -Search by character name, franchize, or username!</p>
            </div>
            <div id="results">
                {/* map character cards here */}
            </div>
        </section>
    )
}