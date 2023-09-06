const express = require("express");
const ItemModel = require("../model/itemModel");
const cartModel = require("../model/addToCart");
const userModel = require("../model/Users");

const updateCartItemQuantity = async (req, res) => {
  try {
    const { id } = req.headers.token;
    const { productId, quantity } = req.body;

    const existingUser = await cartModel.findOne({ userId: id });

    if (!existingUser) {
      return res.status(404).json({ message: "User cart not found" });
    }

    const existingProductIndex = existingUser.cart_products.findIndex(
      product => product.productId.toString() === productId
    );

    if (existingProductIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    existingUser.cart_products[existingProductIndex].quantity = quantity;
    await existingUser.save();

    res.json({ message: "Product quantity updated in cart" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};




const addProductToCart = async (req, res) => {
  try {
    const { id } = req.headers.token;
    const { productId, quantity } = req.body;
    
    // Find the user's cart
    const existingUser = await cartModel.findOne({ userId: id });

    if (existingUser) {
      const existingProductIndex = existingUser.cart_products.findIndex(
        product => product.productId == productId
      );

      if (existingProductIndex !== -1) {
        existingUser.cart_products[existingProductIndex].quantity += quantity;
      } else {
        existingUser.cart_products.push({
          productId,
          quantity
        });
      }
      await existingUser.save();
      res.send("success");
    } else { // New user, first time adding to cart
      const data = new cartModel({
        userId: id,
        cart_products: [{ productId, quantity }]
      });
      data.save();
      res.send("success");
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};



// const getCartItems = async (req, res) => {
//   try {
//     const { id } = req.headers.token;
//     console.log("User ID:", id);

//     const cartData = await cartModel.findOne({ userId: id }).populate({
//       path: "cart_products.productId",
//       model: ItemModel,
//       select: { itemName: 1, itemPrice: 1, imageUrl: 1 }, // Include imageUrl
//     });

//     console.log("Cart Data:", cartData);

//     if (!cartData) {
//       return res.status(404).json({ message: "User cart not found" });
//     }

//     let totalPrice = 0;

//     for (const cartProduct of cartData.cart_products) {
//       const { productId, quantity } = cartProduct;

//       if (!productId || !productId.itemPrice || !quantity) {
//         console.log("Invalid cart product data:", cartProduct);
//         continue; // Skip this iteration if data is missing
//       }

//       const productPrice = productId.itemPrice;
//       const productQuantity = quantity;

//       totalPrice += productPrice * productQuantity;
//     }

//     console.log("Calculated Total Price:", totalPrice);

//     // Extract relevant information for each product
//     const productsWithInfo = cartData.cart_products.map(cartProduct => ({
//       productId: cartProduct.productId._id,
//       itemName: cartProduct.productId.itemName,
//       itemPrice: cartProduct.productId.itemPrice,
//       imageUrl: cartProduct.productId.imageUrl,
//       quantity: cartProduct.quantity,
//     }));

//     res.json({ cartData: productsWithInfo, totalPrice });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };




const getCartItems = async (req, res) => {
  try {
    const { id } = req.headers.token;
    console.log("User ID:", id);

    const cartData = await cartModel.findOne({ userId: id }).populate({
      path: "cart_products.productId",
      model: ItemModel,
    });

    console.log("Cart Data:", cartData);

    if (!cartData) {
      return res.status(404).json({ message: "User cart not found" });
    }

    let totalPrice = 0;
    const productsWithInfo = [];

    for (const cartProduct of cartData.cart_products) {
      const { productId, quantity } = cartProduct;

      if (!productId || !productId.itemPrice || !quantity) {
        console.log("Invalid cart product data:", cartProduct);
        continue; // Skip this iteration if data is missing
      }

      const product = await ItemModel.findById(productId);

      if (!product) {
        console.log("Product not found:", productId);
        continue; // Skip this iteration if product is not found
      }

      const productPrice = product.itemPrice;
      const productQuantity = quantity;

      totalPrice += productPrice * productQuantity;

      productsWithInfo.push({
        productId: product._id,
        itemName: product.itemName,
        itemPrice: product.itemPrice,
        imageUrl: product.imageUrl, // Include imageUrl
        quantity: quantity,
      });
    }

    console.log("Calculated Total Price:", totalPrice);

    res.json({ cartData: productsWithInfo, totalPrice });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

  
  
// const deleteCartItem = async (req, res) => {
//     try {
//         const { id } = req.headers.token;
//         const { productId } = req.body;

//         const existingUser = await cartModel.findOne({ userId:id });
//         // console.log(existingUser)
//         if (!existingUser) {
//             return res.status(404).json({ message: "User cart not found" });
//         }
//         console.log(existingUser.cart_products);
//         const existingProductIndex = existingUser.cart_products.findIndex(
//             product => product.productId === productId
//         );

//         if (existingProductIndex !== -1) {
//             return res.status(404).json({ message: "Product not found in cart" });
//         }

//         existingUser.cart_products.splice(existingProductIndex, 1);
//         await existingUser.save();

//         res.json({ message: "Product removed from cart" });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };


const deleteCartItem = async (req, res) => {
    try {
        const { id } = req.headers.token;
        const { productId } = req.body;

        const existingUser = await cartModel.findOne({ userId: id });
        
        if (!existingUser) {
            return res.status(404).json({ message: "User cart not found" });
        }

        console.log("Existing Cart Products:", existingUser.cart_products);

        const existingProductIndex = existingUser.cart_products.findIndex(
            product => product.productId.toString() === productId
            // Convert productId to string and compare
        );

        console.log("Existing Product Index:", existingProductIndex);

        if (existingProductIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        existingUser.cart_products.splice(existingProductIndex, 1);
        await existingUser.save();

        res.json({ message: "Product removed from cart" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};








const deleteAllCartItems = async (req, res) => {
    try {
      const {id} = req.headers.token;
      

      const existingUser = await cartModel.findOne({ userId:id });

        if (!existingUser) {
            return res.status(404).json({ message: "User cart not found" });
        }

        existingUser.cart_products = []; // Remove all items from cart
        await existingUser.save();

        res.json({ message: "All items removed from cart" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};




// const updateCartItemQuantity = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { productId, quantity } = req.body;

//         const existingUser = await cartModel.findOne({ userId });

//         if (!existingUser) {
//             return res.status(404).json({ message: "User cart not found" });
//         }

//         const existingProductIndex = existingUser.cart_products.findIndex(
//             product => product.productId.toString() == productId
//         );

//         if (existingProductIndex === -1) {
//             return res.status(404).json({ message: "Product not found in cart" });
//         }

//         existingUser.cart_products[existingProductIndex].quantity = quantity;
//         await existingUser.save();

//         res.json({ message: "Product quantity updated in cart" });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };




module.exports = {
  addProductToCart,
  getCartItems,
  deleteCartItem,
  deleteAllCartItems,
  updateCartItemQuantity
};
