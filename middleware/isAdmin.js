const ExpressError = require("../utils/ExpressError")

module.exports.isAdmin = (req,res,next)=>{
    if(!req.user){
        throw new ExpressError(401,"User must be logged in")
    }
    else if(req.user.role != 'ADMIN'){
        throw new ExpressError(401,"Access Denied")
    }
    else{
        next()
    }
}