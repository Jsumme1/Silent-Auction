const { User } = require('../models');
//imports the models we will be interacting with 

//declares a variable to hold an object of functions that interact with the database
const userController = {
    createUser: async (req, res) => {
        try {
            let newUser = await User.create(req.body);
            res.json(newUser)
        } catch (error) {
            console.log(error)
        }
    }
    //TODO other user controller functions
};

//exports the object of functions so other files can access it
module.exports = userController;