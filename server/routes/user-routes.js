const router = require('express').Router();
const {
    createUser
} = require("../controllers/user_controller");
const {
    checkUser
} = require("../controllers/auth_controller")


router.route("/signup").post(createUser)
//
router.route("/data").get(checkUser);

module.exports = router