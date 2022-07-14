const router = require('express').Router();
//requires express router

//imports the functions we need from the controller files
const {
    createUser
} = require("../controllers/user_controller");
const {
    checkUser
} = require("../controllers/auth_controller")

// "/api/user/signup"  
router.route("/signup").post(createUser)

// "/api/user/data" checks to see if a user is logged in / still logged in 
router.route("/data").get(checkUser);

//exports the built router
module.exports = router