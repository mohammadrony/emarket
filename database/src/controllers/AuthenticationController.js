const { User } = require('../models')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const crypto = require("crypto")

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register(req, res) {
        try {
            const user = await User.create(req.body)
            userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err) {
            res.status(400).send({
                error: 'This account is already in use.'
            })
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                return res.status(403).send({
                    error: 'Incorrect email or password!'
                })
            }
            const correctPassword = password === user.password
            if (!correctPassword) {
                return res.status(403).send({
                    error: 'Incorrect email or password!'
                })
            }
            userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err) {
            res.status(500).send({
                error: 'An error occured when trying to sign in.'
            })
        }
    },

    async requestToken(req, res) {
        try {
            var buf = crypto.randomBytes(20);
            var token = buf.toString('hex');
            req.body.resetPasswordToken = token;
            const user = { email: req.body.email, resetPasswordToken: token };
            await User.update(user, {
                where: {
                    email: user.email
                }
            })

            if (!user) {
                return res.status(403).send({
                    error: 'Invalid Email Address.'
                })
            }
            var transporter = await nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.ESTORE_EMAIL,
                    pass: process.env.ESTORE_PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false
                }
            })
            var mailOptions = {
                from: process.env.ESTORE_EMAIL,
                to: 'ronyku1829@gmail.com',
                subject: 'Reset Password on e-store',
                text: "hello",
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + 'localhost:8080' + '/reset-password/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            }
            let mail = await transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    return console.log('Error sending an email', err);
                }
                console.log("Message sent: %s", info.messageId);
            });
            res.send(token);
        } catch (err) {
            console.log("here4")
            res.status(500).send({
                error: 'An error occured when trying to reset the password.'
            })
        }
    },
    async verifyToken(req, res) {
        try {
            const token = req.body.token
            const user = await User.findOne({
                where: {
                    resetPasswordToken: token
                }
            });
            if (!user) {
                return res.status(403).send({
                    error: "Invalid token no."
                })
            }
            res.send(token)
        } catch (err) {
            res.status(500).send({
                error: "An error occured when verifying the authentication token."
            })
        }
    },
    async resetPassword(req, res) {
        try {
            const user = { password: req.body.password, resetPasswordToken: "check" }
            const userId = req.body.id
            await User.update(user, {
                where: {
                    id: userId
                }
            })
            res.send(userId)
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to reset your password."
            })
        }
    }
}