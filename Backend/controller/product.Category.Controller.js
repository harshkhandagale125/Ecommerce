const Products = require("../model/product.category.schema");
const multer = require("multer");

// Set up multer storage for category images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where you want to store category images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//add category

//  const addProductCategory = async (req, res) => {

//     try {

//       const category_name = req.body.category_name;

//       const existingCategory = await Products.findOne({ category_name });

//       if (existingCategory) {

//         return res.send('Category already exists in the database.');

//       }

//         const newCategory = new Products({

//         category_name,

//       });

//       await newCategory.save();

//       res.send('Added category successfully.');

//     } catch (err) {

//       res.status(500).send(err.message);

//     }

//   };

const addProductCategory = async (req, res) => {
  try {
    const imageData = req.file;
    const imageUrl = imageData ? `/uploads/${imageData.filename}` : "";
    const { category_name } = req.body;

    // Check if category_name is provided
    if (!category_name) {
      return res.status(400).json({
        message: "category_name is required!",
      });
    }

    const existingCategory = await Products.findOne({ category_name });

    if (existingCategory) {
      return res.status(409).json({
        message: "Category already exists in the database.",
      });
    }

    const newCategory = new Products({
      category_name,
      category_image: imageUrl, // Save the image URL to the database
    });

    await newCategory.save();

    res.status(201).json({
      message: "Added category and image successfully.",
      data: newCategory,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


//Get all product_category

const getProductCategory = async (req, res) => {
  try {
    const allCategory = await Products.find(
      {},
      "category_name category_image"
    );

    res.json(allCategory);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProductCategory = async (req, res) => {
  const productID = req.params.id;

  try {
    const deletedCategory = await Products.findByIdAndDelete(productID);

    res.json({
      message: "User deleted successfully",

      Products: deletedCategory,
    });
  } catch (error) {
    res

      .status(500)

      .json({ message: "Error deleting user", error: error.message });
  }
};

const updateProductCategory = async (req, res) => {
  const productID = req.params.id;
  const { category_name } = req.body;

  try {
    // Check if there's another category with the same name excluding the current one
    const existingCategory = await Products.findOne({
      category_name,
      _id: { $ne: productID },
    });

    if (existingCategory) {
      return res.status(400).json({ error: 'Category already exists in the database.' });
    }

    const updatedData = {
      category_name,
    };

    // Check if category_image is present in the request body
    if (req.file) {
      updatedData.category_image = `/uploads/${req.file.filename}`;
    }

    const updatedCategory = await Products.findOneAndUpdate(
      { _id: productID },
      updatedData,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the category.' });
  }
};



module.exports = {
  addProductCategory,

  getProductCategory,

  deleteProductCategory,

  updateProductCategory,
};
