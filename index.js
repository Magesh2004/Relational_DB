const express = require('express')
const app = express()

require('dotenv').config()

const errorHandler = require('./middleware/errorHandler')
const userRoute = require('./routes/user')
const categoryRoute = require('./routes/category')
const bookRoute = require('./routes/book')
const cartRoute = require('./routes/cart')

app.listen(8000,()=>{
    console.log("The server is running on port 8000.....");
})

app.use(express.json())

//routers
app.use('/',userRoute)
app.use('/',categoryRoute);
app.use('/',bookRoute);
app.use('/',cartRoute);

//middleware to handle error
app.use(errorHandler)