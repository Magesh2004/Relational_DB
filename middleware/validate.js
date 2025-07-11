const joi = require('../config/joi')
const ExpressError = require('../utils/ExpressError')

module.exports.validateUser = (req,res,next)=>{
    const {error} = joi.userValidate.validate(req.body);
    if(error){
        const msg = error.details.map((err)=>err.message).join(',')
        throw new ExpressError(400,msg)
    }else{
        next()
    }
}
module.exports.validateCategory = (req,res,next)=>{
    const {error} = joi.categoryValidate.validate(req.body);
    if(error){
        const msg = error.details.map((err)=>err.message).join(',')
        throw new ExpressError(400,msg)
    }else{
        next()
    }
}
module.exports.validateBook = (req,res,next)=>{
    const {error} = joi.bookValidate.validate(req.body);
    if(error){
        const msg = error.details.map((err)=>err.message).join(',')
        throw new ExpressError(400,msg)
    }else{
        next()
    }
}
module.exports.validateUpBook = (req,res,next)=>{
    const {error} = joi.upBookValidate.validate(req.body);
    if(error){
        const msg = error.details.map((err)=>err.message).join(',')
        throw new ExpressError(400,msg)
    }else{
        next()
    }
}