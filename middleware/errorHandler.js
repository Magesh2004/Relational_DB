const sendResponse = require('../utils/sendResponse')
const logger = require('../utils/logger')

const errorHandler = (err,req,res,next)=>{
    try{
    let {statusCode = 500,message = "Internal Server Error "} = err;
    const errName = err?.constructor?.name;
    const errCode = err?.code;
    if(errName == 'PrismaClientUnknownRequestError'){
        statusCode = 400;
        message = "There is an prisma unknown errror"
    }
    else if(errName == 'PrismaClientInitializationError'){
        statusCode = 500;
        message = "Failed while initializing Prisma error"
    }
    else if(errName == 'PrismaClientValidationError'){
        statusCode = 400;
        message = `Validation Failed ${err.message}`
    }
    else if (errName === 'ExpressError') {
      statusCode = err.status;
      message = err.message;
    }
    if(errName!=='ExpressError'){
        logger.error(message,{
        method:req.method,
        stack:err.stack,
        path:req.path,
        errorcode:errCode
    })
    }
    sendResponse(res,statusCode,false,message)
    }catch(err){
        sendResponse(res,500,false,"Error in the ErrorHandler")
    }
}

module.exports = errorHandler
