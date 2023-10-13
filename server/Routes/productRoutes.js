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
  getPhotoController,
  similarProductController,
  filterProductsController,
  searchProductsController,
} = require("../controller/productController");

//*Routes

//*First check authentication middleware and then only check the admin because req.user will be accessible only when the user is authenticated or can also be set the req.user in the time when the user is logging in
router.post(
  "/add-product",
  formidable(),
  verifyAuthentication,
  verifyAdmin,
  createProductController
);
router.get("/all-products", allProductsController);
router.get("/single-product/:productId", singleProductController);
router.get("/product-photo/:productId", getPhotoController);
router.post("/filter-products", filterProductsController);
router.post("/search-products", searchProductsController);
router.get(
  "/similar-products/:productId/:categoryId",
  similarProductController
);
router.patch(
  "/update-product/:productId",
  formidable(),
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
