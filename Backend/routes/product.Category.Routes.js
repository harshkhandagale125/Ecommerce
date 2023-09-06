const express = require('express');
const Products = require('../model/product.category.schema');
const multer = require('multer');
const path = require('path');
const ProductcategoryController = require('../controller/product.Category.Controller');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the upload directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

 

 

router.post('/addProductCategory', upload.single('category_image'),ProductcategoryController.addProductCategory);

 

 

 

 

router.get('/getProductCategory', async (req, res) => {

    ProductcategoryController.getProductCategory(req, res);

})

 

 

 

router.put('/updateProductCategory/:id', upload.single('category_image'), ProductcategoryController.updateProductCategory);

 
router.get('/getSingleProductCategory/:id', async (req, res) => {
    ProductcategoryController.getSingleProductCategory(req, res);
});

//delete by Id

router.delete('/deleteProductCategory/:id', async (req, res) => {

    ProductcategoryController.deleteProductCategory(req,res);

});

 

module.exports = router;