const { User } = require('../models');

const userController = {
    createUser: async (req, res) => {
        try {
            let newUser = await User.create(req.body);
            res.json(newUser)
        } catch (error) {
            console.log(error)
        }
    },
};

module.exports = userController;