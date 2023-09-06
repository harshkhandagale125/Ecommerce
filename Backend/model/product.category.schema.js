const mongoose = require('mongoose');

 

const product_category = {


       category_name: String,

       category_image :String

}

const Products = mongoose.model('Product_Category', product_category);

 

module.exports = Products;