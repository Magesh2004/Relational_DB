//db
const prisma = require('../config/db');
const ExpressError = require('../utils/ExpressError');
//utils
const sendResponse = require('../utils/sendResponse')


module.exports.AddToCart = async(req,res)=>{
    const {bookId} = req.params;
    const {quantity=1} = req.body ||{};
    const qty = parseInt(quantity);
    const bId = parseInt(bookId);
    const cartId = req.user.cartId
    
    const book = await prisma.book.findUnique({
        where:{
            id:bId
        }
    })
    const existingCart = await prisma.cartItems.findUnique({
        where:{
            cartId_bookId:{
                cartId,
                bookId:bId
            }
        }
    })
    let cartitem
    if(existingCart){
        cartitem = await prisma.cartItems.update({
            where:{
                cartId_bookId:{
                    cartId,
                    bookId:bId
                }
            },data:{
                quantity:{
                    increment:qty
                }
            }
        })
    }else{
        cartitem = await prisma.cartItems.create({
            data:{
                cartId,
                bookId:bId,
                quantity,
                price:book.price
            }
        })

    }
    const cart = await prisma.cartItems.findMany({
        where:{
            cartId
        }
    })
    
    const total = cart.reduce((total,item)=>{
        return total + (item.price*item.quantity);
    },0)

    await prisma.cart.update({
        where:{
            id:cartId
        },data:{
            total
        }
    }) 
    sendResponse(res,200,true,"Successfully added to cart",{cartitem})
}

module.exports.RemoveFromCart = async(req,res)=>{
    const {bookId} = req.params;
    const bId = parseInt(bookId);
    const cartId = req.user.cartId;
    const existingCart = await prisma.cartItems.findUnique({
        where:{
            cartId_bookId:
            {bookId:bId,
            cartId}
        }
    })
    if(!existingCart)throw new ExpressError(404,"Item not found on cart")
    const delItem = await prisma.cartItems.delete({
        where:{
            cartId_bookId:{
                bookId:bId,
                cartId
            }
        }
    })
    const cartitem = await prisma.cartItems.findMany({
        where:{
            cartId
        }
    })
    const total = cartitem.reduce((total,item)=>{
        return total + (item.quantity * item.price)
    },0);
    const cart = await prisma.cart.update({
        where:{
            id:cartId
        },
        data:{
            total
        }
    })
    sendResponse(res,200,true,"Successfully Removed from cart",{cart})
}

module.exports.FetchCart =async(req,res)=>{
    const cartId  = req.user.cartId;
    const cart = await prisma.cart.findUnique({
        where:{
            id:cartId
        },include:{
            items:{
                include:{
                    book:true
                }
            }
        }
    })
    sendResponse(res,200,true,"Successfully fetched cart",{cart})
}