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
            req.body.userType = "customer"
            if (req.body.userType == "customer") {
                req.body.variant = "warning"
                req.body.priority = 2
                req.body.ShopId = 1
            }
            else if (req.body.userType == "Admin") {
                req.body.variant = "dark"
                req.body.priority = 1
                req.body.ShopId = 1
            }
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
                text: 'Hello ' + user.firstName + ' ' + user.lastName + ',\n\n' +
                    'Your email verification link to create an account on e-store\n\n' +
                    'Please follow the link to complete the process:\n\n' +
                    'http://' + 'localhost:8080' + '/register/' + token + '\n\n' +
                    'If you did not request this, please ignore this email.\n'
            }
            await transporter.sendMail(mailOptions, function (err) {
                if (err) {
                    return console.log('Error sending an email', err);
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
                ShopId: user.ShopId
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
                }
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
                        return console.log('Error sending an email', err);
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
                priority: user.priority,
                ShopId: user.ShopId
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
    async user(req, res) {
        try {
            const user = await User.findByPk(req.params.id, {
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
                    "ShopId"
                ]
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
    async deleteAccount(req, res) {
        console.log("up here to delete account")
        console.log("up here to delete account")
        console.log("up here to delete account")
        console.log("up here to delete account")
        console.log("up here to delete account")
        console.log("up here to delete account")
        console.log("up here to delete account")
        console.log("up here to delete account")
        console.log("up here to delete account")
        console.log("up here to delete account")
        try {
            console.log(req.user.id, req.params.password)
            console.log(req.user.id, req.params.password)
            console.log(req.user.id, req.params.password)
            console.log(req.user.id, req.params.password)
            console.log(req.user.id, req.params.password)
            console.log(req.user.id, req.params.password)
            const user = User.findOne({
                where: {
                    id: req.user.id,
                    password: req.params.password
                }
            })
            if (!user) {
                return res.status(403).send({
                    error: "Incorrect Password."
                })
            }
            await user.destroy();
            res.sendStatus(200)
        } catch (error) {
            res.status(500).send({
                error: "An error occured when trying to delete an user account"
            })
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.update(req.body, {
                where: {
                    id: req.body.id
                }
            })
            res.send(user);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to update user information"
            })
        }
    },
    async updatePassword(req, res) {
        try {
            userId = req.user.id;
            newPassword = req.body.newPassword;
            currentPassword = req.body.currentPassword;
            const user = await User.update(newPassword, {
                where: {
                    id: userId,
                    password: currentPassword
                }
            })
            res.send(user)
        } catch (err) {
            res.status(500).send({
                error: "Incorrect current password."
            })
        }
    },
    async getUserList(req, res) {
        try {
            const userId = req.user.id
            if (!userId) {
                return res.status(403).send({
                    error: "Request is not authenticated."
                })
            }
            const userList = await User.findAll({
                attributes: [
                    "id",
                    "email",
                    "firstName",
                    "lastName",
                    "phoneNo",
                    "profileImage",
                    "userType",
                    "variant",
                    "priority",
                    "ShopId"
                ]
            })
            res.send(userList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get user list."
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
            const user = await User.findOne({
                where: {
                    resetPasswordToken: req.params.token
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
            const user = await User.findOne({
                where: {
                    registerToken: req.params.token
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
                    + "your email is verified on our store.\n"
            }
            await transporter.sendMail(mailOptions, function (err) {
                if (err) {
                    return console.log('Error sending an email', err);
                }
            });
            res.send(userRet)
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to reset your password."
            })
        }
    }
}