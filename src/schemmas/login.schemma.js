import Joi from "joi"


export const cadastroSchemma = Joi.object({
    name: Joi.string().required().trim(),
    email: Joi.string().required().trim(),
    password: Joi.string().required().trim(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).trim()

})

export const loginSchemma = Joi.object({
    email: Joi.string().required().trim(),
    password: Joi.string().required().trim()
})