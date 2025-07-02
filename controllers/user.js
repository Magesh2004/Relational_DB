const prisma = require('../config/db')

const sendResponse = require('../utils/sendResponse')

module.exports.FetchAll = async(req,res)=>{
    const user = await prisma.user.findMany();
    const cart = await prisma.cart.findMany({
        include:{
            books:true
        }});
    sendResponse(res,200,"Successfully fetched User data",{user,cart})
}