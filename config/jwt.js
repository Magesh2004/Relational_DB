const jwt = require('jsonwebtoken');

module.exports.generateAccessToken = (payLoad)=>{
    return jwt.sign(payLoad,process.env.ACCESS_SECRET_KEY,{expiresIn:process.env.ACCESS_EXPIRY_TIME})
}

module.exports.generateRefreshToken = (payLoad)=>{
    return jwt.sign(payLoad,process.env.REFRESH_SECRET_KEY,{expiresIn:process.env.REFRESH_EXPIRY_TIME})
}

module.exports.verifyAccessToken = (token)=>{
    return jwt.verify(token,process.env.ACCESS_SECRET_KEY)
}

module.exports.verifyRefreshToken = (token)=>{
    return jwt.verify(token,process.env.REFRESH_SECRET_KEY)
}