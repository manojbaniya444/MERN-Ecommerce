const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productModel",
        required: true,
      },
    ],
    items: [
      {
        type: String,
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
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "Processing",
      enum: [
        "Processing",
        "Dispatched",
        "Your package is on the way",
        "Delivered",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orderModel", orderSchema);
