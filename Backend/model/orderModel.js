// models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to your User schema
    required: true,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart', // Reference to your Cart schema
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to your Product schema
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  // Add other fields as needed
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
