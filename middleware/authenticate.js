const jwt = require('../config/jwt');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

module.exports.authenticate = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(!token){
        throw new ExpressError(401,"Token missing")
    }   
    let user;
    try{
        user = jwt.verifyAccessToken(token)
    }catch(err){
        throw new ExpressError(401,"Token Invalid or Expired ")
    }
    req.user = user;
    next()
}