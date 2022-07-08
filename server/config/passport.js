var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var {User} = require("../models");

// Telling passport we want to use a Local Strategy.
// In other words, we want login with a username/username and password
passport.use(new LocalStrategy(
    // Our user will sign in using an username, rather than a "username"
    
    function (username, password, done) {
        // When a user tries to sign in this code runs
        User.findOne({
            where: {
                username: username
            }
        }).then(function (dbUser) {
            // If there's no user with the given username
            if (!dbUser) {
                return done(null, false, {
                    message: "Incorrect username."
                });
            }
            // If there is a user with the given username, but the password the user gives us is incorrect
            else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }

            // If none of the above, return the user
            return done(null, dbUser);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = passport;