const mongoose = require('mongoose');
const express = require('express');


const Otp  = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    expiresIn:{
        type:Number,
    }
},{
    timestamps:true,
});


module.exports = new mongoose.model("Otp", Otp)
