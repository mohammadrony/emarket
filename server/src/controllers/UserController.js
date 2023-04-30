const { User } = require('../models')

module.exports = {
    async checkUserName(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    username: req.params.userName
                },
                attributes: ["id"]
            })
            if (!user) {
                res.send({
                    userNameAvailable: true
                })
            }
            else {
                res.send({
                    userNameAvailable: false
                })
            }
        } catch (error) {
            res.status(500).send({
                error: "An error occured valid username checking."
            })
        }
    },
    async deleteAccount(req, res) {
        try {
            if (req.params.userId == req.user.id || req.user.priority == 1) {
                const user = await User.findByPk(req.params.userId)
                if (!user) {
                    return res.status(403).send({
                        error: 'No user to delete.'
                    })
                }
                await user.destroy();
                res.send({ id: user.id })
            }
            else {
                return res.status(403).send({
                    error: "You do not have that privilege to do that."
                })
            }
        } catch (error) {
            res.status(500).send({
                error: "An error occured when trying to delete an user account"
            })
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User.findByPk(req.params.userId, {
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
                    "CompanyId"
                ]
            })
            res.send(userList);
        } catch (err) {
            res.status(500).send({
                error: "An error occured when trying to get user list."
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
    async getUserByEmail(req, res) {
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
    }
}