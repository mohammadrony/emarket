const Joi = require('joi')

module.exports = {
    register(req, res, next) {
        const schema = Joi.object({
            firstName: Joi.string().regex(new RegExp('^.{0,32}$')),
            lastName: Joi.string().regex(new RegExp('^.{0,32}$')),
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-z0-9]{8,32}$')
            ),
            isAdmin: Joi.bool()

        })

        const validate = schema.validate(req.body)
        if (validate.error) {
            switch (validate.error.details[0].context.key) {
                case 'firstName':
                    res.status(400).send({
                        error: `first name and last name can't have over 32 characters`
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
                            No other than lower case, upper case and numerics.
                        `
                    })
                    break
                default:
                    console.log(validate)
                    res.status(400).send({
                        error: 'Invalid registration information'
                    })
            }
        } else {
            next()
        }
    }
}