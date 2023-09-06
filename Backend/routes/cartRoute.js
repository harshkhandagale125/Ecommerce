const express = require('express');
const router = express.Router();
const {  addProductToCart,
    getCartItems,
    deleteCartItem,
    deleteAllCartItems,
    updateCartItemQuantity} = require('../controller/cartController')
const auth = require('../utils/auth')


router.post('/addToCart',auth.resolveJwt,addProductToCart)

router.get('/getCart',auth.resolveJwt,getCartItems)
router.post('/deleteCartItem',auth.resolveJwt,deleteCartItem)
router.delete('/deleteAllCartItems',auth.resolveJwt,deleteAllCartItems)

router.put('/updateCartItem',auth.resolveJwt,updateCartItemQuantity);






module.exports = router;