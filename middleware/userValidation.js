const joi = require('joi')

const SignUpValidation  = async (req, res, next) => {
    try {
        const schema = joi.object({
          email: joi.string().email().required(),
            first_name: joi.string().required(),
            last_name: joi.string().required(),
            password: joi.string().required(),
            gender: joi.string().valid('male', 'female'),
          
        })

        await schema.validateAsync(req.body, { abortEarly: true })
    
        next()
    } catch (error) {
        return res.status(422).json({
            message: error.message,
            success: false
        })
    }
}

const LoginValidation = async (req, res, next) => {
    try {
        const schema = joi.object({
            password: joi.string().required(),
            email: joi.string().email().required(),
        })

        await schema.validateAsync(req.body, { abortEarly: true })
    
        next()
    } catch (error) {
        return res.status(422).json({
            message: error.message,
            success: false
        })
    }
}


module.exports = { SignUpValidation, LoginValidation };