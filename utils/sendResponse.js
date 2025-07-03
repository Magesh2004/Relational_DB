const sendResponse = (res,status,success,message,data)=>{
    res.status(status).json({
        success:success,
        message,
        data
    })
}
module.exports = sendResponse