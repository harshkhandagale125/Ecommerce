const express = require('express');
const brandcontroller = require('../controller/brandcontroller');
const Brandrouter = express.Router();
const multer = require('multer');
const path = require('path');

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

// Route to add a brand
Brandrouter.post('/addbrand', upload.single('imageUrl'), (req, res) => {
    brandcontroller.createBrand(req, res);
});

// Route to get brands
Brandrouter.get('/brands', async (req, res) => {
    brandcontroller.getBrands(req, res);
});

Brandrouter.get('/getbrand/:id', async (req, res) => {
    brandcontroller.getBrandsById(req, res);
});

// Route to delete brands
Brandrouter.delete('/deletebrands', async (req, res) => {
    brandcontroller.deleteBrand(req, res);
});

Brandrouter.delete('/deletebrand/:id', async (req, res) => {
    brandcontroller.deleteBrand(req, res);
});

// Route to update brands
Brandrouter.put('/updatebrands/:id', upload.single('imageUrl'), (req, res) => {
    brandcontroller.updateBrand(req, res);
});

Brandrouter.get('/brandswithimages', async (req, res) => {
    brandcontroller.getBrandsWithImages(req, res);
});

Brandrouter.get('/getBrandById/:categoryId', async (req, res) => {
    brandcontroller.getBrandsById(req, res);
});

// Brandrouter.get('/getBrandById/:categoryId', brandcontroller.getBrandsById);

module.exports = Brandrouter;
