const mongoose = require('mongoose');
const express = require('express');
const { Mongoose } = require('mongoose');

const BrandName = new mongoose.Schema({
    Name: {type: String, required: true, unique: true},
    categoryid: {type: mongoose.Types.ObjectId, ref: "Product_Category"},
    imageUrl: String
});

module.exports = new mongoose.model("Brands", BrandName);