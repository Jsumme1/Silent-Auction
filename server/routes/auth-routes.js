const router = require('express').Router();
var passport = require("../config/passport");
const {
    login,
    logout,
    requestPasswordReset,
    validatePasswordResetToken,
    updatePassword
} = require("../controllers/auth_controller")
//
router.route("/login").post(passport.authenticate("local"), login);
//
router.route("/logout").get(logout)

router.route("/forgot-password").post(requestPasswordReset);

router.route("/validate-token").post(validatePasswordResetToken)

//updates the user with the new password
router.route("/update-password").post(updatePassword)

module.exports = router