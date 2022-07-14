const express = require('express');
//path is needed so that we navigate throughout our folder struture 
const path = require("path");
//session and passport are required here to assis with authentication
var session = require("express-session");
var passport = require("./config/passport");
//dotenv is required so that we can use environmentvariables
require('dotenv').config();

//the port will either be the environment variable or 3001
const PORT = process.env.PORT || 3001;
//requires our sequelize database connection 
const sequelize = require('./config/connection/config');

//intializes our express app
const app = express();
//allows us to accept post requests / request bodys that hold data -aka encoded data through the url
app.use(express.urlencoded({ extended: true }));
//tells express we will be using java-script-obeject-notation
app.use(express.json());

//uses an environment secret, and sets up other options for session
//currently we have resave se to true, this would be used in a time-out situation
//ie user perspective = confirm "You will be timed out in 2 minutes would you like to stay logged in?"
app.use(session({ secret: process.env.SECRET, resave: true, saveUninitialized: true }));
//tells our app it will be using passport 
app.use(passport.initialize());
//connects our passport to session
app.use(passport.session());

//tells the app what routes to use when a fetch or axios request is sent to "/api/:etc"
app.use("/api", require('./routes'));

if (process.env.NODE_ENV === "production") {
  //tells our app where the "html" and it's assets(css & js) exist 
  app.use(express.static(path.join(__dirname, '../client/build')));
  //handles all get routes that are Not "/api/:etc" 
  app.get('*', function (req, res) {
    //and sends the "html" file from our react app 
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}
//turn on the server and actively listens for requests
app.listen(PORT, () => {
   sequelize.sync({ force: false }).then(() => {
    console.log(`App listening on port ${PORT}!`);
  });
})