const router = require('express').Router();
//requires express router

//imports the functions we need from the auth_controller file using object deconstruction
const {
    login,
    logout,
    requestPasswordReset,
    validatePasswordResetToken,
    updatePassword
} = require("../controllers/auth_controller")
//requires passport for authentication purposes
var passport = require("../config/passport");

// "/api/auth/login"  uses passport to check if the password and username match the database
router.route("/login").post(passport.authenticate("local"), login);
// "/api/auth/logout"
router.route("/logout").get(logout)

// "/api/auth/forgot-password"
router.route("/forgot-password").post(requestPasswordReset);
// "/api/auth/validate-token"
router.route("/validate-token").post(validatePasswordResetToken)
// "/api/auth/update-password"
router.route("/update-password").post(updatePassword)

//exports the built router
module.exports = router