const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      required: true,
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryModel",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductModel", ProductSchema);
