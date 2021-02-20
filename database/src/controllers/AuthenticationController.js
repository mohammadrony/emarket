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
            req.body.userType = "Customer"
            if (req.body.userType == "Customer") {
                req.body.variant = "warning"
                req.body.priority = 2
                req.body.CompanyId = 1
            }
            else if (req.body.userType == "Admin") {
                req.body.variant = "dark"
                req.body.priority = 1
                req.body.CompanyId = 1
            }
            var buf = crypto.randomInt(100000, 999999);
            var token = buf.toString();
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
                subject: "E-store Email Verification",
                text: 'Hi ' + user.firstName + ' ' + user.lastName + ',\n\n' +
                    'Welcome to E-store!\n\n' +
                    'Your email verification code is: ' + token + '\n\n' +
                    'Use this code to complete the registration process.\n\n' +
                    'Enjoy using you E-store account!\n'
            }
            await transporter.sendMail(mailOptions, function (err) {
                if (err) {
                    return res.status(403).send({
                        error: "An error occured when trying to send an email to register."
                    });
                }
            });
            const newUser = {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profileImage: user.profileImage,
                priority: user.priority,
                CompanyId: user.CompanyId
            }
            res.send({
                user: newUser,
                token: jwtSignUser(newUser)
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
                },
                attributes: [
                    "id",
                    "username",
                    "firstName",
                    "lastName",
                    "profileImage",
                    "email",
                    "phoneNo",
                    "userType",
                    "variant",
                    "priority",
                    "CompanyId"
                ]
            })
            if (!user) {
                console.log("user not found")
                return res.status(403).send({
                    error: 'Incorrect login information.'
                })
            }
            if (user.registerToken) {
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
                    subject: 'Verify Account on e-store',
                    text: 'hello ' + user.firstName + ' ' + user.lastName + ',\n\n' + 'Recently you\'ve requested to create an account on e-store\n\n' +
                        'Please verify your email address first\n\n' +
                        'click on the following link, or paste it into your browser to complete this process\n\n' +
                        'http://' + 'localhost:8080' + '/user-verify/' + token + '\n\n' +
                        'If you did not request this, please ignore this email.\n'
                }
                await transporter.sendMail(mailOptions, function (err) {
                    if (err) {
                        return res.status(403).send({
                            error: "An error occured when trying to send an email to login verification."
                        });
                    }
                });
                return res.status(403).send({
                    error: 'We need to verify your email first.<br>So, We sent you a verification link to do that.<br>Please follow the given instruction.'
                })
            }
            const correctPassword = password === user.password
            if (!correctPassword) {
                return res.status(403).send({
                    error: 'Incorrect login information.'
                })
            }

            const retUser = {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profileImage: user.profileImage,
                userType: user.userType,
                variant: user.variant,
                priority: user.priority,
                CompanyId: user.CompanyId
            }
            res.send({
                user: retUser,
                token: jwtSignUser(retUser)
            })
        } catch (err) {
            res.status(500).send({
                error: 'An error occured when trying to sign in.'
            })
        }
    },

    async verifyPassword(req, res) {
        try {
            const correctPassword = req.params.password === req.user.password
            if (!correctPassword) {
                return res.status(403).send({
                    error: 'incorrect current password.'
                })
            }
            res.send({ correctPassword: correctPassword })
        } catch (error) {
            res.status(500).send({
                error: "An error occured when verifying the password"
            })
        }
    },
    async updatePassword(req, res) {
        try {
            const user = await User.update(req.body, {
                where: {
                    id: req.user.id
                }
            })
            res.send(user)
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to update the password"
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
                    return res.status(403).send({
                        error: "An error occured when trying to send an email for request password token"
                    });
                }
            });
            res.send(token);
        } catch (err) {
            res.status(500).send({
                error: 'An error occured when trying to request password token.'
            })
        }
    },
    async verifyToken(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    resetPasswordToken: req.params.token
                },
                attributes: [
                    "id",
                    "username",
                    "firstName",
                    "lastName",
                    "profileImage",
                    "email",
                    "phoneNo",
                    "userType",
                    "variant",
                    "priority",
                    "CompanyId"
                ]
            });
            if (!user) {
                return res.status(403).send({
                    error: "invalid token."
                })
            }
            res.send(user)
        } catch (err) {
            res.status(500).send({
                error: "An error occured when verifying the password reset token."
            })
        }
    },
    async verifyRegsToken(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    id: req.params.userId
                },
                attributes: [
                    "id",
                    "username",
                    "firstName",
                    "lastName",
                    "profileImage",
                    "email",
                    "phoneNo",
                    "userType",
                    "registerToken",
                    "variant",
                    "priority",
                    "CompanyId"
                ]
            });
            if (!user || user.registerToken != req.params.registerToken) {
                return res.status(403).send({
                    error: "invalid token id."
                })
            }
            res.send({
                user: user,
                token: jwtSignUser(user)
            })
        } catch (err) {
            res.status(500).send({
                error: "An error occured when verifying the register token."
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
                    return res.status(403).send({
                        error: "An error occured when trying to send email to reset password."
                    })
                }
            });
            res.send(userId)
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to reset password."
            })
        }
    },
    async resetRegsToken(req, res) {
        try {
            const user = { registerToken: "" }
            const userId = req.body.id
            const userRet = await User.update(user, {
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
                    + "your email is now verified on our store.\n\n"
                    + "Thank you.\n"
            }
            await transporter.sendMail(mailOptions, function (err) {
                if (err) {
                    return res.status(403).send({
                        error: "An error occured when trying to send an email to reset register token"
                    });
                }
            });
            res.send(userRet)
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to reset register token."
            })
        }
    }
}