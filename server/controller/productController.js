const slugify = require("slugify");
const ProductModel = require("../model/productModel");
const fs = require("fs");

//* Create product controller
const createProductController = async (req, res) => {
  const { price, name, description, quantity, category } = req.fields;
  const { photo } = req.files;

  try {
    if (photo && photo.size > 1000000) {
      return res
        .status(500)
        .send({ success: false, message: "Photo size exceeds 1 MB" });
    }

    const product = new ProductModel({
      name,
      price,
      description,
      quantity,
      category,
      slug: slugify(name),
    });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(200).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res
      .status(405)
      .send({ success: false, message: "Error creating the product", error });
  }
};

//* Get all products controller
const allProductsController = async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .select({ photo: 0 })
      .limit(10)
      .populate("category")
      .sort({ createdAt: -1 });
    if (!products) {
      return res
        .status(400)
        .send({ success: false, message: "Fail fetching products." });
    }
    res.status(200).send({
      success: true,
      message: "All products",
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Catch error getting all products",
      error,
    });
    console.log(error);
  }
};

const singleProductController = (req, res) => {
  res.status(200).send({ msg: "single Route" });
};

const updateProductController = (req, res) => {
  res.status(200).send({ msg: "update  Route" });
};

const deleteProductController = (req, res) => {
  res.status(200).send({ msg: "delete Route" });
};

module.exports = {
  createProductController,
  allProductsController,
  singleProductController,
  updateProductController,
  deleteProductController,
};
