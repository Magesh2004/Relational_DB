const sendResponse = require('../utils/sendResponse')

const errorHandler = (err,req,res,next)=>{
    try{
    let {statusCode = 500,message = "Internal Server Error "} = err;
    console.log(err)
    const errName = err?.constructor?.name;
    const errCode = err?.code;
    // if(errName == 'PrismaClientKnownRequestError'){
        
    // }
    if(errCode == 'P2001'){
        statusCode = 404;
        message = "The record searched does not exist"
    }
    else if(errCode == 'P2002'){
        statusCode = 400;
        message = "Unique constraint error"
    }
    else if(errCode == 'P2005'){
        statusCode = 400;
        message = "Invalid Field Type error"
    }
    else if(errName == 'PrismaClientUnknownRequestError'){
        statusCode = 400;
        message = "There is an prisma unknown errror"
    }
    else if(errName == 'PrismaClientInitializationError'){
        statusCode = 500;
        message = "Failed while initializing an error"
    }
    else if(errName == 'PrismaClientValidationError'){
        statusCode = 400;
        message = `Validation Failed ${err.message}`
    }
    else if (errName === 'ExpressError') {
      statusCode = err.status;
      message = err.message;
    }
    sendResponse(res,statusCode,false,message)
    }catch(err){
        sendResponse(res,500,false,"Error in the ErrorHandler")
    }
}

module.exports = errorHandler
