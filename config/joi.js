const joi = require('joi');

module.exports.categoryValidate = joi.object({
    name:joi.string().min(2).max(30).required()
})

module.exports.bookValidate = joi.object({
    title:joi.string().min(2).required(),
    inStock:joi.number().min(1).required(),
    price:joi.number().min(1).required()
})

module.exports.userValidate = joi.object({
    name:joi.string().min(2).max(15).required(),
    email:joi.string().email().required()
})


module.exports.upBookValidate = joi.object({
    title:joi.string().min(2).optional(),
    inStock:joi.number().min(1).optional(),
    price:joi.number().min(1).optional()
}).min(1)