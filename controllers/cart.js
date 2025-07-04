//db
const prisma = require('../config/db')
//utils
const sendResponse = require('../utils/sendResponse')


module.exports.AddToCart = async(req,res)=>{
    const {bookid} = req.params;
    const bId = parseInt(bookid);
    const book = await prisma.book.update({
        where:{
            id:bId
        },
        data:{
            cart:{
                connect:{
                    id:req.user.cartId
                }
            }
        }
    })
    sendResponse(res,200,true,"Successfully added to cart",{book})
}

module.exports.RemoveFromCart = async(req,res)=>{
    const {bookid} = req.params;
    const bId = parseInt(bookid);
    const book = await prisma.book.update({
        where:{
            id:bId
        },
        data:{
            cart:{
                disconnect:true
            }
        }
    })
    sendResponse(res,200,true,"Successfully Removed from cart",{book})
}