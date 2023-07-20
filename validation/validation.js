const joi = require('joi')

/**
 * Le paramètre est la donées a validée (res.body)
 * @param {*} body 
 * @returns 
 */
const userValidation = (body) => {
    const userValidationSignUp = joi.object({
        firstName : joi.string().min(2).max(30).trim().required(),
        lastName : joi.string().min(2).max(30).trim().required(),
        email : joi.string().email().trim().required(),
        password : joi.string().min(6).max(30).required()
    })

    const userValidationLogin = joi.object({
        email : joi.string().email().trim().required(),
        password : joi.string().min(6).max(30).required()
    })

    return {
        userValidationSignUp: userValidationSignUp.validate(body),
        userValidationLogin: userValidationLogin.validate(body),
    }
}

module.exports = userValidation