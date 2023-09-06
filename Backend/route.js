const express = require('express');
const routes = express.Router();




//
const ProductCategoryRouter = require('./routes/product.Category.Routes');
const userRoute=require('./routes/userRoutes')
const adminRoute=require('./routes/adminRoutes')
const brandRoute = require('./routes/brandroutes')
const itemRoute = require('./routes/itemRoute')
const cartRoute = require('./routes/cartRoute')
const orderRoute = require('./routes/orderRoute')

//
routes.use('/',ProductCategoryRouter);
routes.use('/admin',adminRoute);
routes.use('/',userRoute);
routes.use('/',brandRoute);
routes.use('/',itemRoute);
routes.use('/',cartRoute)
routes.use('/',orderRoute)

module.exports = routes;