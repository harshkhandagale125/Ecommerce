const brandmodel = require("../model/brandmodel");

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

const createBrand = async (req, res) => {
  try {
    const imageData = req.file;
    console.log(req.file);
    const imageUrl = imageData ? `/uploads/${imageData.filename}` : "";
    const { Name, categoryid } = req.body;
    console.log(req.body);
    if (categoryid) {
      const newBrand = new brandmodel({
        Name,
        categoryid,
        imageUrl,
      });

      const createdBrand = await newBrand.save();

      res.status(201).json({
        message: "Brand created successfully",
        data: createdBrand,
      });
    } else {
      res.status(400).json({
        message: "categoryid is required!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getBrands = async (req, res) => {
  try {
    const brands = await brandmodel.find({});
    if (brands) {
      res.status(200).json({
        msg: "Success",
        data: brands,
      });
    } else {
      res.status(404).json({
        msg: "Data not found!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Brand ID missing!",
      });
    }
    const deletedBrand = await brandmodel.findByIdAndDelete(id);
    if (!deletedBrand) {
      return res.status(404).json({
        msg: "Brand not found!",
      });
    }
    res.status(200).json({
      msg: "Brand deleted successfully",
      data: deletedBrand,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateBrand = async (req, res) => {
  const brandID = req.params.id;
  const { brandName, categoryid } = req.body;

  try {
    // Check if there's another brand with the same name excluding the current one
    const existingBrand = await brandmodel.findOne({
      Name: brandName,
      _id: { $ne: brandID },
    });

    if (existingBrand) {
      return res.status(400).json({ error: 'Brand with this name already exists in the database.' });
    }

    const updatedData = {
      Name: brandName,
    };

    // Check if imageUrl is present in the request body (assuming you're uploading an image)
    if (req.file) {
      updatedData.imageUrl = `/uploads/${req.file.filename}`;
    }

    // If categoryid is provided, add it to the updatedData
    if (categoryid) {
      updatedData.categoryid = categoryid;
    }

    const updatedBrand = await brandmodel.findOneAndUpdate(
      { _id: brandID },
      updatedData,
      { new: true }
    );

    if (!updatedBrand) {
      return res.status(404).json({ error: 'Brand not found.' });
    }

    res.json(updatedBrand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the brand.' });
  }
};



// const getBrandById = async (req, res) => {
//     try {
//         const brandId = req.params.id;
//         const brand = await brandmodel.findById(brandId);

//         if (!brand) {
//             return res.status(404).json({ message: 'Brand not found' });
//         }

//         res.status(200).json(brand);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

const getBrandsWithImages = async (req, res) => {
  try {
    const brands = await brandmodel.find({});
    if (brands) {
      res.status(200).json({
        msg: "Success",
        data: brands.map((brand) => ({
          _id: brand._id,
          Name: brand.Name,
          imageUrl: `${brand.imageUrl}`, // Adjust the image URL based on your configuration
        })),
      });
    } else {
      res.status(404).json({
        msg: "Data not found!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getBrandsById = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const data = await brandmodel.find({ categoryid: categoryId }); // Use "categoryid" instead of "id"

    if (data) {
      res.status(200).json({
        msg: "Success",
        data: data,
      });
    } else {
      res.status(404).json({
        msg: "Data not found!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


module.exports = {
  createBrand,
  getBrands,
  deleteBrand,
  updateBrand,
  getBrandsById,
  getBrandsWithImages,
};
