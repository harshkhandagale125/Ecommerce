const express = require('express');

const orderController = require('../controller/orderController')

const router = express.Router();

const auth = require('../utils/auth')

 

 

router.post('/addOrder',auth.resolveJwt, async (req, res) => {

    orderController.transferDataToOrder(req, res);

})

 

router.get('/getOrder', auth.resolveJwt,async (req, res) => {

    orderController.getOrders(req, res);

})

 

router.get('/getOrder', async (req, res) => {

    orderController.getOrders(req, res);

})

router.delete('/deleteOrder/:orderId', async (req, res) => {

    orderController.DeleteOrderByID(req, res);

})

 

 

 

 

module.exports = router;