const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register (req, res) {
        try {
            const user = await User.create(req.body)
            userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch(err) {
            console.log(err)
            res.status(400).send({
                error: 'This account is already in use.'
            })
        }

    },
    async login (req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if(!user) {
                return res.status(403).send({
                    error: 'Incorrect email or password!'
                })
            }

            const correctPassword = password === user.password
            console.log(password, user.password)
            if(!correctPassword) {
                return res.status(403).send({
                    error: 'Incorrect email or password!'
                })
            }

            userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch(err) {
            res.status(500).send({
                error: 'An error occured when trying to sign in.'
            })
        }

    }
}