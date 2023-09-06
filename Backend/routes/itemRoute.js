const express = require('express');
const ItemController = require('../controller/itemController');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// const itemRouter = express.Router();

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

router.post('/addItem', upload.single('itemImage'), ItemController.createBrand)


// router.post('/addItem', async (req, res) => {
//     ItemController.createBrand(req, res);
// })

router.post("/getFilteredItems", ItemController.getFilteredItems);

router.get('/getAllItems', async (req, res) => {
    ItemController.getAllProducts(req, res);
})

router.put('/updateItem',upload.single('itemImage'), async (req, res) => {
    ItemController.updateItem(req, res);
})


router.delete('/deleteItem/:id', async (req, res) => {
    ItemController.deleteItem(req, res);
})

router.get('/getItemWithCategory',ItemController.getItemWithCategory);


router.get('/getItemById/:itemId', ItemController.getProductById);

router.get('/MobLap' ,ItemController.getItemWithCategory1)

module.exports = router;
