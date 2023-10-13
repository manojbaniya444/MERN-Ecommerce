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
      // .limit(10)
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

//* Get photo controller
const getPhotoController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.productId).select({
      photo: 1,
    });
    if (!product) {
      return res
        .status(200)
        .send({ success: false, message: "Failed fetching product image" });
    }

    res.set("Content-type", product.photo.contentType);
    res.status(200).send(product.photo.data);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Catch error photo fetch", error });
  }
};

//* Get single product controller
const singleProductController = async (req, res) => {
  const { productId } = req.params;

  const product = await ProductModel.findById(productId).select({ photo: 0 });

  if (!product) {
    return res
      .status(400)
      .send({ success: false, message: "No product found" });
  }

  res.status(200).send({
    success: true,
    message: "Single product fetch successful.",
    product,
  });
};

//*Update product controller
const updateProductController = async (req, res) => {
  const { name, description, price, stock, quantity, category } = req.fields;
  const { photo } = req.files;

  if (photo && photo.size > 1000000) {
    return res
      .status(400)
      .send({ success: false, message: "Photo size exceed 1 MB" });
  }

  try {
    const product = await ProductModel.findByIdAndUpdate(req.params.productId, {
      ...req.fields,
      slug: slugify(req.fields.name),
    });

    if (!product) {
      return res
        .status(400)
        .send({ success: false, message: "No product found to update" });
    }
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res
      .status(200)
      .send({ success: true, message: "Product updated successful", product });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ success: false, message: "Catch product update", error, photo });
  }
};

//*Delete product controller
const deleteProductController = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await ProductModel.findByIdAndDelete(productId);

    if (!product) {
      return res
        .status(400)
        .send({ success: false, message: "No product found to delete" });
    }

    return res.status(200).send({
      success: false,
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ success: false, message: "Catch delete product error", error });
  }
};

//* Get similar products based on category

const similarProductController = async (req, res) => {
  const productId = req.params.productId;
  const categoryId = req.params.categoryId;

  try {
    const products = await ProductModel.find({
      category: categoryId,
      _id: { $ne: productId },
    }).select({ photo: 0 });

    res
      .status(200)
      .send({ success: true, message: "Similar products", products });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ success: false, message: "Similar products fetch false", error });
  }
};

//* Filter products controller

// {
//   category: ["6527cea8197336080a36f2b8"],
//   $and: [{ price: { $gt: 15000 } }, { price: { $lte: 25000 } }],
// }

const filterProductsController = async (req, res) => {
  const { category, price } = req.body;
  try {
    const products = await ProductModel.find({
      $and: [
        category && category.length > 0
          ? {
              category: { $in: category },
            }
          : {},
        {
          price: {
            $gte: price.min,
            $lte: price.max,
          },
        },
      ],
    }).select({
      photo: 0,
    });
    res.status(200).send({
      success: true,
      message: "Filtered products",
      products,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ success: false, message: "Error filter products", error });
  }
};

//Get search products
const searchProductsController = async (req, res) => {
  const searchQuery = req.body.search;
  try {
    const products = await ProductModel.find({
      $or: [
        {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        },
        {
          description: {
            $regex: searchQuery,
            $options: "i",
          },
        },
      ],
    }).select({ photo: 0 });
    if (!products) {
      return res.status(200).send({ success: false, message: "No products" });
    }
    res
      .status(200)
      .send({ success: true, message: "Search product results", products });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Failed fetching search products",
      error,
    });
  }
};

module.exports = {
  createProductController,
  allProductsController,
  singleProductController,
  updateProductController,
  deleteProductController,
  getPhotoController,
  similarProductController,
  filterProductsController,
  searchProductsController,
};
