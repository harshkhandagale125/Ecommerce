const mongoose = require('mongoose');
const express = require('express');

const ProductItem = new mongoose.Schema({
   
    imageUrl: { type: String, },
    itemName: {type:String, required:true},
    itemPrice : {type:Number, required:true},
    itemColor : {type:String, required:true },
    itemSpecs : {type:String, },
    BrandId : {type: mongoose.Types.ObjectId, ref:"BrandName"},
    itemStock:{type:Number}
});

module.exports = new mongoose.model("ProductItem", ProductItem)
