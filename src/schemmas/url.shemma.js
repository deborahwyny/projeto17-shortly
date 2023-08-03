import Joi from "joi"

export const urlSchemma= Joi.object ({
    url: Joi.string().required().uri()
})