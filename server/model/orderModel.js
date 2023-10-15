const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productModel",
      required: true,
    },
  ],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  //   orders: [
  //     {
  //       productId: {
  //         type: mongoose.Schema.Types.ObjectId,
  //       },
  //       count: {
  //         type: Number,
  //         default: 1,
  //       },
  //     },
  //   ],
});

module.exports = mongoose.model("orderModel", orderSchema);
