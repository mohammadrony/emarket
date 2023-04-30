const Joi = require('joi')

module.exports = {
    register(req, res, next) {
        const schema = Joi.object({
            firstName: Joi.string().regex(new RegExp('^.{2,32}$')),
            lastName: Joi.string().regex(new RegExp('^.{2,32}$')),
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-z0-9]{8,32}$')
            ),
        })

        const validate = schema.validate(req.body)
        if (validate.error) {
            switch (validate.error.details[0].context.key) {
                case 'firstName':
                    res.status(400).send({
                        error: `first name can have 2-32 characters`
                    })
                    break
                case 'lastName':
                    res.status(400).send({
                        error: `last name can have 2-32 characters`
                    })
                    break
                case 'email':
                    res.status(400).send({
                        error: 'please provide a valid email address'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `Invalid password format<br>
                            Only lower case, upper case and numerics is allowed.
                        `
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Invalid error in authentication controller.'
                    })
            }
        } else {
            next()
        }
    },
    updatePassword(req, res, next) {
        const schema = Joi.object({
            password: Joi.string().regex(
                new RegExp('^[a-zA-z0-9]{8,32}$')
            ),
        })
        const validate = schema.validate(req.body)
        if (validate.error) {
            switch (validate.error.details[0].context.key) {
                case "password":
                    res.status(400).send({
                        error: 'Invalid password format. Only lower case, upper case and numerics is allowed.'
                    })
                    break;
                default:
                    res.status(400).send({
                        error: 'Invalid error in authentication controller.'
                    })
            }
        } else {
            next()
        }
    }
}