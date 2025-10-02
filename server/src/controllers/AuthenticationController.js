const { User } = require('../models')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const crypto = require("crypto")

let emailFrom = `Emarket <${process.env.EMARKET_EMAIL}>`

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register(req, res) {
        try {
            req.body.userType = req.body.userType || "Customer"
            req.body.variant = req.body.variant || "warning"
            req.body.priority = req.body.priority || 2
            req.body.CompanyId = req.body.CompanyId || 1
            req.body.profileImage = "http://localhost:8081/public/user-image/default-man.png"

            let buf = crypto.randomInt(100000, 999999);
            let token = buf.toString();
            req.body.registerToken = token;
            const user = await User.create(req.body)

            let transporter = await nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMARKET_EMAIL,
                    pass: process.env.EMARKET_PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false
                }
            })
            let mailOptions = {
                from: emailFrom,
                to: req.body.email,
                subject: "Email verification code to register",
                text: 'Hi ' + user.firstName + ' ' + user.lastName + ',\n\n' +
                    'Welcome to emarket!\n\n' +
                    'Your email verification code is: ' + token + '\n\n' +
                    'Use this code to complete the registration process.\n\n' +
                    'Enjoy using your emarket account!\n'
            }
            // await transporter.sendMail(mailOptions, function (err) {
            //     if (err) {
            //         return res.status(403).send({
            //             error: "An error occured when trying to send an email to register."
            //         });
            //     }
            // });
            return res.status(200).send({ id: user.id })
        } catch (err) {
            res.status(400).send({ error: 'This account is already in use.' });
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
            if (user.registerToken) {
                var transporter = await nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMARKET_EMAIL,
                        pass: process.env.EMARKET_PASSWORD,
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                })
                let mailOptions = {
                    from: emailFrom,
                    to: user.email,
                    subject: "Email verification code to login",
                    text: 'hello ' + user.firstName + ' ' + user.lastName + ',\n\n' + 'Recently you\'ve requested to create an account on emarket\n\n' +
                        'Please verify your email address first\n\n' +
                        'click on the following link, or paste it into your browser to complete this process\n\n' +
                        'http://' + 'localhost:8080' + '/user-verify/' + user.registerToken + '\n\n' +
                        'If you did not request this, please ignore this email.\n'
                }
                // await transporter.sendMail(mailOptions, function (err) {
                //     if (err) {
                //         return res.status(403).send({
                //             error: "An error occured when trying to send an email to login verification."
                //         });
                //     }
                // });
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
            const newUser = {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userType: user.userType,
                variant: user.variant,
                profileImage: user.profileImage,
                priority: user.priority,
                CompanyId: user.CompanyId
            }
            res.status(200).send({
                user: newUser,
                token: jwtSignUser(newUser)
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
            res.status(200).send({ correctPassword: correctPassword })
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
            res.status(200).send(user)
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to update the password"
            })
        }
    },
    async requestPasswordToken(req, res) {
        try {
            
            const { email } = req.body;
            const user = await User.findOne({ where: { email } });
            
            if (!user) {
                return res.status(403).send({ error: 'User not found' });
            }

            var buf = crypto.randomBytes(20);
            var token = buf.toString('hex');

            user.resetPasswordToken = token;

            await User.update({ resetPasswordToken: token }, {
                where: {
                    email: user.email
                }
            })

            var transporter = await nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMARKET_EMAIL,
                    pass: process.env.EMARKET_PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false
                }
            })
            var mailOptions = {
                from: emailFrom,
                to: req.body.email,
                subject: "Reset Password Confirmation",
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + 'localhost:8080' + '/reset-password/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            }
            // await transporter.sendMail(mailOptions, function (err) {
            //     if (err) {
            //         return res.status(403).send({
            //             error: "An error occured when trying to send an email for request password token"
            //         });
            //     }
            // });
            return res.status(200).send({ id: user.id });
        } catch (err) {
            res.status(403).send({ error: err.message });
        }
    },
    async verifyPasswordToken(req, res) {
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
                    "userType",
                    "variant",
                    "priority",
                    "CompanyId"
                ]
            });
            if (!user) {
                return res.status(403).send({
                    error: "invalid token."
                });
            }
            res.status(200).send({ user });
        } catch (err) {
            return res.status(403).send({ error: err.message });
        }
    },

    async checkRegsToken(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                },
                attributes: ["id", "firstName", "lastName", "registerToken"]
            });
            if (!user) {
                return res.status(404).send({
                    error: "Invalid email address."
                })
            }
            var retUser = {
                id: user.id,
                verificationStatus: true
            }
            if (user.registerToken) {
                retUser.verificationStatus = false
                var transporter = await nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMARKET_EMAIL,
                        pass: process.env.EMARKET_PASSWORD,
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                })
                var mailOptions = {
                    from: emailFrom,
                    to: req.body.email,
                    subject: "Email Verification code to register",
                    text: 'Hi ' + user.firstName + ' ' + user.lastName + ',\n\n' +
                        'Welcome to emarket!\n\n' +
                        'Your email verification code is: ' + user.registerToken + '\n\n' +
                        'Use this code to complete the registration process.\n\n' +
                        'Enjoy using you emarket account!\n'
                }
                // await transporter.sendMail(mailOptions, function (err) {
                //     if (err) {
                //         return res.status(403).send({
                //             error: "An error occured when trying to send an email to register."
                //         });
                //     }
                // });
            }

            res.status(200).send(retUser)
        } catch (err) {
            return res.status(500).send({
                error: "An error occured when trying to check users registration token."
            })
        }
    },
    async verifyRegsToken(req, res) {
        try {
            const user = await User.findByPk(req.body.id, {
                attributes: [
                    "id",
                    "username",
                    "firstName",
                    "lastName",
                    "profileImage",
                    "email",
                    "userType",
                    "registerToken",
                    "variant",
                    "priority",
                    "CompanyId"
                ]
            }
            );

            if (!user || user.registerToken != req.body.registerToken) {
                return res.status(403).send({
                    error: "invalid token id."
                })
            }
            const newUser = {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userType: user.userType,
                variant: user.variant,
                profileImage: user.profileImage,
                priority: user.priority,
                CompanyId: user.CompanyId
            }
            res.status(200).send({
                user: newUser,
                token: jwtSignUser(newUser)
            })
        } catch (err) {
            res.status(500).send({
                error: "An error occured when verifying the register token."
            })
        }
    },

    async resetPassword(req, res) {
        try {
            const { id, password, resetToken } = req.body;
            // Find user by id
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).send({ error: "User not found." });
            }
            // Check reset token
            if (!resetToken || user.resetPasswordToken !== resetToken) {
                return res.status(403).send({ error: "Invalid or expired reset token." });
            }
            // Update password and clear token
            await User.update(
                { password, resetPasswordToken: "" },
                { where: { id } }
            );

            var transporter = await nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMARKET_EMAIL,
                    pass: process.env.EMARKET_PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false
                }
            })
            var mailOptions = {
                from: emailFrom,
                to: req.body.email,
                subject: "Password Update Acknowledgement",
                text: 'Hello ' + req.body.name + '\n\n' +
                    'We wanted to let you know that your emarket password was reset.\n'
            }
            // await transporter.sendMail(mailOptions, function (err) {
            //     if (err) {
            //         return res.status(403).send({
            //             error: "An error occured when trying to send email to reset password."
            //         })
            //     }
            // });
            return res.status(200).send({ id })
        } catch (err) {
            res.status(403).send({
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
                    user: process.env.EMARKET_EMAIL,
                    pass: process.env.EMARKET_PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false
                }
            })
            var mailOptions = {
                from: emailFrom,
                to: req.body.email,
                subject: "Email Address Verification Confirmed",
                text: "Hello " + req.body.name + ",\n\n"
                    + "Your email is now verified on emarket.\n\n"
                    + "Thank you.\n"
            }
            // await transporter.sendMail(mailOptions, function (err) {
            //     if (err) {
            //         return res.status(403).send({
            //             error: "An error occured when trying to send an email to reset register token"
            //         });
            //     }
            // });
            res.status(200).send(userRet)
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to reset register token."
            })
        }
    }
}