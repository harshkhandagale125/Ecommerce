const mongoose = require('mongoose');
const express = require('express');


const Cart  = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    cart_products:[{
        productId : {
            type: mongoose.Schema.Types.ObjectId,
             ref:"ProductItem",
             required:true
            },
        quantity :{type:Number}
    }],
    
});


module.exports = new mongoose.model("Cart", Cart)