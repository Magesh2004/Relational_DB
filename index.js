const express = require('express')
const app = express()

const prisma = require('./config/db')
const sendResponse = require('./utils/sendResponse')
const e = require('express')

app.listen(8000,()=>{
    console.log("The server is running on port 8000.....");
})
app.use(express.json())



app.get('/',async(req,res)=>{
    try{
        const user = await prisma.user.findMany();
        const cart = await prisma.cart.findMany();
        const book = await prisma.book.findMany();
        const category = await prisma.category.findMany();
        sendResponse(res,200,"Successfully fetched",{user,cart,book,category})
    }catch(err){
        sendResponse(res,500,"Somethinog is wrong",{err})
    }
})

app.post('/',async(req,res)=>{
    const {name} = req.body;
    const newCategory = await prisma.category.create({
        data:{
            name : name
        }
    })
    sendResponse(res,201,"succesfully created",newCategory)
})
app.get('/:catid',async(req,res)=>{
    const {catid} = (req.params);
    const id = parseInt(catid)
    const category = await prisma.category.findUnique({
        where:{id:id},
        include:{
            books:true
        }
    })
    sendResponse(res,200,"Successfully fetched",{category})
})
app.post('/:catid',async(req,res)=>{
    
})