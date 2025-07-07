const prisma = require("../config/db");
const { PaymentStatuses, OrderStatus } = require("../generated/prisma");
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
           paymentStatus:PaymentStatuses.UNPAID,
           status:OrderStatus.PENDING
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
            items:true
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
            paymentStatus:PaymentStatuses.PAID,
            status:OrderStatus.ORDERED
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
            status:OrderStatus.DELEVERD
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
            paymentStatus:PaymentStatuses.REFUNDED,
            status:OrderStatus.CANCELED
        }
    })
    sendResponse(res,200,true,"Status Successfully",{order})
}

module.exports.FetchOrder = async(req,res)=>{
    const {orderId} = req.params;
    const oId = parseInt(orderId)
    const order = await prisma.order.findFirst({
        where:{
            id:oId
        },include:{
            items:{
                include:{
                    book:true
                }
            }
        }
    })
    sendResponse(res,200,true,"Status Successfully",{order})
}

