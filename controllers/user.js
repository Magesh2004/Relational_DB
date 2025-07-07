const prisma = require('../config/db');
const ExpressError = require('../utils/ExpressError');
const bcrypt = require('bcrypt')
const jwt = require('../config/jwt')

const sendResponse = require('../utils/sendResponse')

module.exports.RegisterNewUser = async(req,res)=>{
    const {name,password,email,role} = req.body;
    const existingUser = await prisma.user.findUnique({
        where:{
            name
        }
    })
    if(existingUser){
        throw new ExpressError(409,"User or email already exist")
    }
    const hashPassword =await bcrypt.hash(password,5);
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password:hashPassword,
            role
        }
    })
    const cart = await prisma.cart.create({
        data: {userId:user.id}
    });
    await prisma.user.update({
        where:{
            id:user.id
        },data:{
            cartId:cart.id
        }
    })
    sendResponse(res,200,true,`User Registered Successfully, Welcome ${user.name}`);
}

module.exports.LoginUser = async(req,res)=>{
    const {name,password} = req.body;
    const user = await prisma.user.findUnique({
        where:{
            name
        }
    })
    if(!user || !(await bcrypt.compare(password,user.password))){
        throw new ExpressError(401,"Invalid password or user")
    }
    const accessKey = jwt.generateAccessToken(user)
    const refreshKey = jwt.generateRefreshToken(user)
    await prisma.refreshToken.create({
        data:{
            token:refreshKey,
            userId:user.id
        }
    })
    sendResponse(res,200,true,"Access Granted",{accessKey,refreshKey})
}

module.exports.LogoutUser = async(req,res)=>{
    const { token } = req.body;
    await prisma.refreshToken.deleteMany({ where: { token } });
    sendResponse(res, 200,true,"Logged out successfully");
}

module.exports.FetchNewAccessToken = async(req,res)=>{
    const{token} = req.body;
    if(!token){
        throw new ExpressError(400,"Token does not exist")
    }
    const existingToken = await prisma.refreshToken.findUnique({
        where:{token}
    })
    if(!existingToken){
        throw new ExpressError(401,"Invalid token")
    }
    let user;
    try{
        user = jwt.verifyRefreshToken(token);
    }catch(err){
        throw new ExpressError(400,"Invalid Token or Token Expired");
    }
    const { exp, iat, ...userPayload } = user;
    const accessKey = jwt.generateAccessToken(userPayload);
    sendResponse(res,200,true,"New Token genereted",{accessKey})    
}

