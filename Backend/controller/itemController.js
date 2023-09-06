const express = require("express");
const ItemModel = require("../model/itemModel");
const BrandModel = require("../model/brandmodel");
const CategoryModel = require("../model/product.category.schema");

const createBrand = async (req, res) => {
  try {
    const imageData = req.file;
    console.log(imageData);
    const imageUrl = imageData ? `/uploads/${imageData.filename}` : "";
    const { itemName, itemPrice, itemColor, BrandId, itemStock, itemSpecs } =
      req.body; // add specs
    if (BrandId !== undefined) {
      console.log(req.body);
      console.log(imageUrl);
      const createdBrand = await ItemModel.create({
        imageUrl,
        itemName,
        itemPrice,
        itemColor,
        BrandId,
        itemStock,
        itemSpecs,
      });
      if (!createdBrand) {
        res.status(400).json({
          msg: "Couldn't create",
        });
      } else {
        res.status(200).json({
          msg: "Data created successfully",
          data: createdBrand,
        });
      }
    } else {
      res.status(400).json({
        message: "BrandID missing!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const getAllProducts = await ItemModel.find({});
    // .populate("BrandId", {name:1 ,_id:0});
    if (getAllProducts) {
      res.status(200).json({
        msg: "Sucsess",
        data: getAllProducts,
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

const getItemWithCategory = async (req, res) => {
  try {
    const getAllProducts = await ItemModel.find({}, { itemName: 1 }).populate({
      path: "BrandId",
      model: BrandModel,
      select: { Name: 1, categoryid: 1 },
      populate: {
        path: "categoryid",
        model: CategoryModel,
        select: { category_name: 1 },
      },
    });

    if (getAllProducts) {
      res.status(200).json({
        msg: "Sucsess",
        data: getAllProducts,
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

const updateItem = async (req, res) => {
  const imageData = req.file;
  console.log(imageData);
  const imageUrl = imageData ? `/uploads/${imageData.filename}` : "";
  const { id, brandId } = req.body;
  console.log(req.body);
  const updateData = {
    itemName: req.body.itemName,
    itemPrice: req.body.itemPrice,
    itemColor: req.body.itemColor,
    itemStock: req.body.itemStock,
    itemSpecs: req.body.itemSpecs,
    imageUrl,
    brandId: req.body.brandId,
  };
  try {
    const updatedProduct = await ItemModel.findOneAndUpdate(
      { _id: id },
      updateData,
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      res.send("product not found");
    } else {
      res.send(updatedProduct);
    }
  } catch (err) {
    res.send("product not found");
    console.log("product not found");
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(typeof id)
    const deleted = await ItemModel.findByIdAndDelete(id);
    // console.log(deleted);
    if (!deleted) {
      res.send("product not found");
    } else {
      res.send("deleted");
    }
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
};

const getItemWithCategory1 = async (req, res) => {
  try {
    const idsList = await CategoryModel.find({});
    // Mobiles
    console.log(idsList);
    let mobileId;
    let laptopId;
    for (let i = 0; i < idsList.length; i++) {
      if (idsList[0].category_name == "Mobile") {
        mobileId = idsList[0]._id;
        laptopId = idsList[1]._id;
      } else {
        mobileId = idsList[1]._id;
        laptopId = idsList[0]._id;
      }
    }
    const brandIdsForMobile = await BrandModel.find({ categoryid: mobileId });

    const mobileCategories = await ItemModel.find(
      { BrandId: { $in: brandIdsForMobile } },
      {
        imageUrl: 1,
        itemName: 1,
        itemPrice: 1,
      }
    ).populate({
      path: "BrandId",
      model: BrandModel,
      select: { Name: 1 },
    });

    // LAptops
    const brandIdsForLaptop = await BrandModel.find({ categoryid: laptopId });

    const laptopCategories = await ItemModel.find(
      { BrandId: { $in: brandIdsForLaptop } },
      {
        imageUrl: 1,
        itemName: 1,
        itemPrice: 1,
      }
    ).populate({
      path: "BrandId",
      model: BrandModel,
      select: { Name: 1 },
    });

    if (mobileCategories.length || laptopCategories.length) {
      res.status(200).json({
        msg: "Success",
        data: {
          Mobilelength: mobileCategories.length,
          Mobile: mobileCategories,
          lapiLength: laptopCategories.length,
          Laptop: laptopCategories,
        },
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

const getProductById = async (req, res) => {
  try {
    const itemId = req.params.itemId; // Get the item ID from the request parameter
    const item = await ItemModel.findById(itemId); // Find item by ID in the database

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item by ID:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getFilteredItems = async (req, res) => {
  try {
    const selectedBrands = req.body.selectedBrands;

    if (!selectedBrands || !Array.isArray(selectedBrands)) {
      return res.status(400).json({ msg: "Invalid request" });
    }

    const filteredItems = await ItemModel.find({
      BrandId: { $in: selectedBrands },
    });

    if (filteredItems) {
      res.status(200).json({
        msg: "Success",

        data: filteredItems,
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
  getAllProducts,
  updateItem,
  deleteItem,
  getItemWithCategory,
  getFilteredItems,
  getProductById,
  getItemWithCategory1,
};
