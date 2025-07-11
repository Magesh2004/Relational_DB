//db
const prisma = require('../config/db');
const ExpressError = require('../utils/ExpressError');
//utils
const sendResponse = require('../utils/sendResponse')

module.exports.CreateBook = async(req,res)=>{
    const {catId} = req.params;
    const {title,inStock,price} = req.body
    const cId = parseInt(catId)
    const book = await prisma.book.create({
        data:{
            title:title,
            inStock,
            price,
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
        throw new ExpressError(400,"Book dosen't exist")
    }else{
        sendResponse(res,200,true,"Successfully fetched",{book})
    }
}
module.exports.UpdateBook = async(req,res)=>{
    const{bookId} = req.params;
    const bId = parseInt(bookId)
    const {title,inStock,price} = req.body;
    const data ={}
    if(title)data.title = title
    if(inStock)data.inStock = inStock
    if(price)data.price = price

    const existingBook = await prisma.book.findUnique({
        where:{
            id:bId
        }
    })
    if(!existingBook)throw new ExpressError(400,"Book doesn't exist")
    const book = await prisma.book.update({
        where:{
            id:bId
        },data
    })
    sendResponse(res,200,true,"Successfully Upadated",{book})
}

