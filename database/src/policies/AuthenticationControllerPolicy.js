const Joi = require('joi')

module.exports = {
    register (req, res, next) {
        const schema = Joi.object({
            username: Joi.string().regex(new RegExp('^[a-zA-z0-9]{4,32}$')),
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-z0-9]{8,32}$')
            ),
            isAdmin: Joi.bool()
            
        })

        const validate = schema.validate(req.body)
        // console.log('debug here', validate.error.details[0].context.key)
        if(validate.error){
            switch(validate.error.details[0].context.key){
                case 'username':
                    res.status(400).send({
                        error: `Only lowercase, uppercase, numerics are allowed in Username
                        <br>
                        And a length of 4 to 32 characters`
                    }) 
                    break
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email address'
                    }) 
                    break
                case 'password':
                    res.status(400).send({
                        error: `The password should contain: 
                            <br>
                            1. 8 to 32 characters in length.
                            <br>
                            2. Not other than lower case, upper case and numerics.
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