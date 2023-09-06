const Order = require("../model/orderModel");

const Cart = require("../model/addToCart"); // Import your Cart model

 

const orderModel = require("../model/orderModel");

 

const item = require("../model/itemModel");

 

 

 

const transferDataToOrder = async (req, res) => {

  try {

    const { id: userId } = req.headers.token; // Extract userId from the token

    // console.log("------------->" + userId);

    const cart = await Cart.findOne({ userId }).populate(

      "cart_products.productId"

    );

 

    if (!cart) {

      return res.status(404).json({ error: "Cart not found" });

    }

 

    // Create a new order based on the cart data

 

    const newOrder = new Order({

      userId,

 

      cartId: cart._id, // Use cart's ID

       

      products: cart.cart_products.map((product) => ({

        productId: product.productId._id,

        quantity: product.quantity,

      })),

    });

 

    // Save the new order to the database

 

    await newOrder.save();

 

    // Delete the cart (assuming you have a delete method in your Cart model)

 

    await Cart.findByIdAndDelete(cart._id);

 

    res.status(201).json({ message: "Order created successfully" });

  } catch (error) {

    console.error("Error creating order:", error);

 

    res.status(500).json({ error: "An error occurred" });

  }

};

 

const getOrders = async (req, res) => {

  try {

    const { id: userId } = req.headers.token; // Assuming you use the user's ID from the token

 

    // console.log(userId);

 

    // Find all orders for the user with the specified user ID and populate user and product details

 

    const orders = await orderModel

      .find({ userId })

 

      .populate("userId") // Populate user details (you can specify the fields you want)

 

      .populate({

        path: "products.productId",

 

        model: item,

 

        select: "itemName itemPrice imageUrl", // Specify the product fields you want

      });

 

    if (!orders || orders.length === 0) {

      return res.status(404).json({ message: "No orders found for the user" });

    }

 

    res.json({ orders });

  } catch (err) {

    console.error(err);

 

    res.status(500).json({ message: "Internal server error" });

  }

};

 

 

const DeleteOrderByID = async (req, res) => {

  try {

    // Extract the order ID from the request parameters

    const { orderId } = req.params;

 

    // Use Mongoose to find and delete the order by ID

    const deletedOrder = await Order.findByIdAndDelete(orderId);

 

    if (!deletedOrder) {

      return res.status(404).json({ message: 'Order not found' });

    }

 

    res.status(200).json({ message: 'Order deleted successfully' });

  } catch (error) {

    console.error('Error deleting order:', error);

    res.status(500).json({ message: 'Internal server error' });

  }

};

 

 

 

 

module.exports = {

  transferDataToOrder,

  getOrders,

  DeleteOrderByID

};