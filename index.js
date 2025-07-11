const express = require('express')
const app = express()


require('dotenv').config()

const errorHandler = require('./middleware/errorHandler')
const userRoute = require('./routes/user')
const categoryRoute = require('./routes/category')
const bookRoute = require('./routes/book')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const ExpressError = require('./utils/ExpressError')
const cors = require('cors')


const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

app.listen(8000,()=>{
    console.log("The server is running on port 8000.....");
})

app.use(cors());
app.use(express.json())

//routers
app.use('/api',userRoute)
app.use('/api',categoryRoute);
app.use('/api',cartRoute);
app.use('/api',orderRoute)
app.use('/api',bookRoute);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.all('/{*any}', (req, res,next) => {
    next( new ExpressError(404, "Page not found"));
});

//middleware to handle error
app.use(errorHandler)