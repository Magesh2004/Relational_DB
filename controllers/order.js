const prisma = require("../config/db");
const sendResponse = require("../utils/sendResponse");

module.exports.PlaceOrder = async(req,res)=>{
    const cartId = req.user.cartId;
    const cart = await prisma.cartItems.findMany({
        where:{
            cartId
        }
    })
    const order = await prisma.order.create({
        data:{
           userId:req.user.id,
           paymentStatus:"Un paid",
           status:"Pending"
        }
    })
    const orderItemsData = cart.map(item=>({
        orderId : order.id,
        bookId : item.bookId,
        price : item.price,
        quantity : item.quantity
    }))

    await prisma.orderItems.createMany({data:orderItemsData})

    await prisma.cartItems.deleteMany({
        where:{
            cartId
        }
    })
    await prisma.cart.update({
        where:{
            id:cartId
        },data:{
            total : 0
        }
    })
    sendResponse(res,200,true,"Success",{order})
}

module.exports.FetchAllOrder = async(req,res)=>{
    const userId = req.user.id;
    const order = await prisma.order.findMany({
        where:{
            userId
        },include:{
            items:{
                include:{
                    book:true
                }
            }
        }
    })
    sendResponse(res,200,true,"Successfully Fetched", {order})

}

module.exports.MakePayment = async(req,res)=>{
    const {orderId} = req.params;
    const oId = parseInt(orderId)
    const order = await prisma.order.update({
        where:{
            id:oId
        },
        data:{
            paymentStatus:"Paid",
            status:"Ordered"
        }
    })
    sendResponse(res,200,true,"Payment made Successfully",{order})

}

module.exports.UpadateStatus = async(req,res)=>{
    const {orderId} = req.params;
    const oId = parseInt(orderId)
    const order = await prisma.order.update({
        where:{
            id:oId
        },data:{
            status:"Deleverd"
        }
    })
    sendResponse(res,200,true,"Status Successfully",{order})
}


module.exports.CancelOrder = async(req,res)=>{
    const {orderId} = req.params;
    const oId = parseInt(orderId)
    const order = await prisma.order.update({
        where:{
            id:oId
        },data:{
            paymentStatus:"Refunded",
            status:"Canceled"
        }
    })
    sendResponse(res,200,true,"Status Successfully",{order})
}