import {
    LOGIN,
    LOGOUT,
    SIGN_UP,
    CHANGE_ERROR_MSG
} from "./actions";

const initialState = {
    auth: false,
    errorMessage: "",
    singleCharacter: false,
    //{
    //      firstName: "Jean Luc",
    //      lastName: "Picard",
    //      age: 45,
    //      franchise: "Star Trek",
    //      description: "" ,
    //}
    user: {
        // id: 2,
        // username: "test",
        // img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbBpAnjzhX3OtbT_voeJHVpalKyECOyNOLA&usqp=CAU",
        // bio: "Consequat anim officia ipsum consectetur commodo. Commodo aute et et cupidatat. Irure voluptate cillum culpa ullamco quis ex magna consectetur. Minim consequat id Lorem incididunt elit veniam sint cupidatat duis enim eu pariatur anim. Mollit adipisicing dolore velit cupidatat proident ad nostrud laborum commodo do esse. Exercitation velit elit aliqua enim.",
        // characters: [
        //     {
        //         firstName: "Jean Luc",
        //         lastName: "Picard",
        //         age: 45,
        //         franchise: "Star Trek",
        //         description: "" ,
        //         conversations: []
        //     }
        // ],
        // conversations:[
        //     {
        //         users: [{ id: 1, img: "https://i.pinimg.com/474x/f1/d9/e1/f1d9e1e814bf8804b9ebd97c42675a0d.jpg", username: "andybvb" }],
        //         id: 1,
        //         messages: [{ id: 1, user: { id: 1 }, message: "Hey", createdAt: "8:00AM" }, { id: 2, user: { id: 1 }, message: "Did you want to get dinner tonight?", createdAt: "8:02AM" }, { id: 3, user: { id: 2 }, message: "sure, why not?", createdAt: "8:05AM" }]
        //     },
        //     {
        //         users: [{ id: 3, img: "https://data.whicdn.com/images/265171376/original.jpg", username: "Gee" }],
        //         id: 2,
        //         messages: [{ id: 4, user: { id: 3 }, message: "Hey,", createdAt: "11:00AM" }, { id: 5, user: { id: 3 }, message: "Do you wanna fuck tonight!", createdAt: "11:32AM" }, { id: 6, user: { id: 2 }, message: "omg", createdAt: "11:40AM" }]
        //     }
        // ]    
    }
}

export const reducers = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:

            if (action.payload) {
                return {
                    ...state,
                    auth: true,
                    user: action.payload,
                }
            } else {

                return {
                    ...state,
                    auth: true,
                    user: action.payload
                }
            }

        case LOGOUT:
            return {
                ...state,
                auth: false
            }
        case SIGN_UP:
            return {
                ...state,
                auth: true
            }
        case CHANGE_ERROR_MSG:
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state
    }
}
export default reducers;