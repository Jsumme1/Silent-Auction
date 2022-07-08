const { User, ResetToken } = require('../models');
const bcrypt = require('bcrypt');
var passport = require("../config/passport");
let crypto = require('crypto');
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const authController = {
    checkUser: function (req, res) {
        if (!req.user) {
            res.json("no user here");
        } else {
            res.json(req.user);
        }
    },
    
};

module.exports = authController;