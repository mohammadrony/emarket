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
            var buf = crypto.randomBytes(20);
            var token = buf.toString('hex');
            req.body.registerToken = token;
            req.body.profileImage = "http://localhost:8084/public/user-image/default-man.png"
            const user = await User.create(req.body)

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
                to: req.body.email,
                subject: "Welcome to e-store",
                text: 'Hello' + user.firstName + ' ' + user.lastName +
                    'You are receiving this because you (or someone else) have requested to create an account on e-store\n\n' +
                    'Please follow the link to complete the process:\n\n' +
                    'http://' + 'localhost:8080' + '/register/' + token + '\n\n' +
                    'If you did not request this, please ignore this email.\n'
            }
            await transporter.sendMail(mailOptions, function (err) {
                if (err) {
                    return console.log('Error sending an email', err);
                }
            });

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
                    error: 'Incorrect login information.'
                })
            }
            if (!user.registerToken) {
                console.log("--------------------")
                console.log(user.registerToken)
                console.log("--------------------")
                return res.status(403).send({
                    error: 'You need to verify your email to login.\n' + 'Please check your email first.\n' + 'This is one time verification.'
                })
            }
            const correctPassword = password === user.password
            if (!correctPassword) {
                return res.status(403).send({
                    error: 'Incorrect login information.'
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
    async user(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.findOne({
                where: {
                    id: userId
                }
            })
            if (!user) {
                return res.status(403).send({
                    error: "User not found."
                })
            }
            res.send(user)
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get an user."
            })
        }
    },
    async validUser(req, res) {
        try {

            const user = await User.findOne({
                where: {
                    email: req.params.email
                },
                attributes: ['id']
            })
            if (!user) {
                return res.status(403).send({
                    error: "Email not registered."
                })
            }
            res.send(user)
        } catch (error) {
            res.status(500).send({
                error: "An error occured when trying to get an user."
            })
        }

    },
    async requestToken(req, res) {
        try {
            var buf = crypto.randomBytes(20);
            var token = buf.toString('hex');
            const user = { email: req.body.email, resetPasswordToken: token };
            await User.update(user, {
                where: {
                    email: user.email
                }
            })
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
                to: req.body.email,
                subject: 'Reset Password on e-store',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + 'localhost:8080' + '/reset-password/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            }
            await transporter.sendMail(mailOptions, function (err) {
                if (err) {
                    return console.log('Error sending an email', err);
                }
            });
            res.send(token);
        } catch (err) {
            res.status(500).send({
                error: 'An error occured when trying to reset the password.'
            })
        }
    },
    async verifyToken(req, res) {
        try {
            const token = req.params.token
            const user = await User.findOne({
                where: {
                    resetPasswordToken: token
                },
                attributes: ["id", "email", "firstName", "lastName", "resetPasswordToken"]
            });
            if (!user) {
                return res.status(403).send({
                    error: "invalid token."
                })
            }
            res.send(user)
        } catch (err) {
            res.status(500).send({
                error: "An error occured when verifying the authentication token."
            })
        }
    },
    async verifyRegsToken(req, res) {
        try {
            const token = req.params.token
            const user = await User.findOne({
                where: {
                    registerToken: token
                },
                attributes: ["id", "email", "firstName", "lastName", "registerToken"]
            });
            if (!user) {
                return res.status(403).send({
                    error: "invalid token."
                })
            }
            res.send(user)
        } catch (err) {
            res.status(500).send({
                error: "An error occured when verifying the authentication token."
            })
        }
    },

    async resetPassword(req, res) {
        try {
            const user = { password: req.body.password, resetPasswordToken: "" }
            const userId = req.body.id
            await User.update(user, {
                where: {
                    id: userId
                }
            })
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
                to: req.body.email,
                subject: 'Password changed on e-store',
                text: 'Hello ' + req.body.name + '\n\n'
                    + 'We wanted to let you know that your e-store password was reset\n'
                    + 'If you did not perform this action, you can recover access by entering ' + req.body.email + ' into the form at ' + 'http://localhost:8080/reset-password' + ' \n'
                    + 'If you run into problems, please contact support by visiting ' + 'http://localhost:8080/contact' + ' \n'
                    + 'Please do not reply to this email with your password. We will never ask for your password, and we strongly discourage you from sharing it with anyone.\n'
            }
            await transporter.sendMail(mailOptions, function (err) {
                if (err) {
                    return console.log('Error sending an email', err);
                }
            });
            res.send(userId)
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to reset your password."
            })
        }
    },
    async resetRegsToken(req, res) {
        try {
            const user = { registerToken: "" }
            const userId = req.body.id
            await User.update(user, {
                where: {
                    id: userId
                }
            })
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
                to: req.body.email,
                subject: 'e-store',
                text: "Hello" + req.body.name + "\n\n"
                    + "your email is verified on our store.\n"
            }
            await transporter.sendMail(mailOptions, function (err) {
                if (err) {
                    return console.log('Error sending an email', err);
                }
            });
            res.send(userId)
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to reset your password."
            })
        }
    }
}