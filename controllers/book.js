//db
const prisma = require('../config/db')
//utils
const sendResponse = require('../utils/sendResponse')

module.exports.CreateBook = async(req,res)=>{
    const {catId} = req.params;
    const {title} = req.body
    const cId = parseInt(catId)
    const book = await prisma.book.create({
        data:{
            title:title,
            categories:{
                create:{
                    category:{
                        connect:{id:cId}
                    }
                }
            }
        }
    })
    sendResponse(res,201,true,"Successfully created a book",{book})

}
module.exports.FetchSpecificBook = async(req,res)=>{
    const{bookId} = req.params;
    const bId = parseInt(bookId)
    const book = await prisma.book.findUnique({
        where:{
            id:bId
        },include:{
            categories:{
                include:{
                    category:true
                }
            }
        }
    })
    if(!book){
        sendResponse(res,200,false,"There is no book found")
    }else{
        sendResponse(res,200,true,"Successfully fetched",{book})
    }
}
module.exports.UpdateBook = async(req,res)=>{
    const{bookId} = req.params;
    const bId = parseInt(bookId)
    const {title} = req.body;
    const book = await prisma.book.update({
        where:{
            id:bId
        },data:{
            title:title
        }
    })
    sendResponse(res,200,true,"Successfully Upadated",{book})

}
module.exports.AddToCart = async(req,res)=>{
    const cart_id = 2;
    const {bookId} = req.params;
    const id = parseInt(bookId);
    const book = await prisma.book.update({
        where:{
            id:id
        },data:{
            cart:{
               connect:{id:cart_id} 
            }
        }
    })
    sendResponse(res,200,true,"Added to cart")

}
// cart_ID = 2