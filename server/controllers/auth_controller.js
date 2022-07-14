const { User, ResetToken } = require('../models');
const bcrypt = require('bcrypt');
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
    login: function (req, res) {
        res.json(req.user);
    },
    logout: function (req, res) {
        req.logout();
        res.redirect("/");
    },
    requestPasswordReset: async function (req, res) {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (!user.email) {
            res.status(401).json({});
        } else {
            await ResetToken.findOneAndUpdate(
                {
                    used: 1
                },
                {
                    where: {
                        email: req.body.email
                    }
                }
            );
            let token = crypto.randomBytes(64).toString('base64');

            //token expires after one hour
            let expireDate = new Date();
            expireDate.setDate(expireDate.getDate());
            let hour = expireDate.getHours() + 1;
            expireDate.setHours(hour)

            //insert token data into DB
            await ResetToken.create({
                email: req.body.email,
                expiration: expireDate,
                token: token,
                used: 0
            });

            const message = {
                from: process.env.SENDER_ADDRESS,
                to: user.email,
                subject: "Password Reset",
                text: 'To reset your password, please click the link below.\n\nhttps://' + process.env.DOMAIN + '/reset-password/?token=' + encodeURIComponent(token) + '&email=' + user.email
            };
            //send email
            transport.sendMail(message, function (err, info) {
                if (err) { console.log(err) }
                else { console.log(info); }
            });
            process.on('uncaughtException', err => {
                console.log(err);
            });
            return res.json({ status: 'ok' });

        }
    },
    validatePasswordResetToken: async function (req, res) {
        let record = await ResetToken.findOne({
            where: {
                email: req.body.email,
                token: req.body.token,
                used: 0
            }
        });
        //error message if not found
        if (record == null) {
            return res.json({
                message: 'Token has expired. Please try password reset again.',
                showForm: false
            });
        }
        //send info about that token to the browser
        return res.json({
            showForm: true,
            record: record
        })
    },
    updatePassword: async function (req, res) {
        let user = req.body.userRecord
        //checks to make sure the token has not expired
        let record = await ResetToken.findOne({
            where: {
                email: user.email,
                token: user.token,
                used: 0
            }
        });
        //sends an error message if no token is found
        if (record == null) {
            return res.json({ status: 'error', message: 'Token not found. Please try the reset password process again.' });
        }
        //updates the token to show it has been used
        await ResetToken.findOneAndUpdate({
            used: 1
        },
            {
                where: {
                    email: user.email
                }
            });
        //hashes new password
        let newPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null);
        //updates the password for the associated user
        await User.findOneAndUpdate({
            password: newPassword
        }, {
            where: {
                email: user.email
            }
        });
        return res.json({ status: 'ok', message: 'Password reset. Please login with your new password.' });
    }

};

module.exports = authController;