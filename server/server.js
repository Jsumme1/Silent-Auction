// server stuff goes here
const express = require('express');
const path = require("path");
var session = require("express-session");
var passport = require("./config/passport");
require('dotenv').config();


const PORT = process.env.PORT || 3001;
const sequelize = require('./config/connection/config');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: process.env.SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", require('./routes'));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}
app.listen(PORT, () => {
   sequelize.sync({ force: false }).then(() => {
    console.log(`App listening on port ${PORT}!`);
  });
})