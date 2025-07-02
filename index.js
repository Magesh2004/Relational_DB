const express = require('express')
const app = express()

const prisma = require('./config/db')
const sendResponse = require('./utils/sendResponse')

const userRoute = require('./routes/user')
const categoryRoute = require('./routes/category')
const bookRoute = require('./routes/book')

app.listen(8000,()=>{
    console.log("The server is running on port 8000.....");
})

app.use(express.json())

app.use('/',userRoute)
app.use('/',categoryRoute);
app.use('/',bookRoute);

app.use((err,req,res,next)=>{
    const {status = 500, message = "Something went wrong ."} = err;
    sendResponse(res,status,message,err)
})