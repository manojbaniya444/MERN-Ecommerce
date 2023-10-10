const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");

const {
  verifyAuthentication,
  verifyAdmin,
} = require("../middleware/authMiddleware");

const {
  createProductController,
  allProductsController,
  singleProductController,
  updateProductController,
  deleteProductController,
} = require("../controller/productController");

router.post(
  "/add-product",
  formidable(),
  verifyAuthentication,
  verifyAdmin,
  createProductController
);
router.get("/all-products", allProductsController);
router.get("/single-product/:productId", singleProductController);
router.patch(
  "/update-product/:productId",
  verifyAuthentication,
  verifyAdmin,
  updateProductController
);
router.delete(
  "/delete-product/:productId",
  verifyAuthentication,
  verifyAdmin,
  deleteProductController
);

module.exports = router;
