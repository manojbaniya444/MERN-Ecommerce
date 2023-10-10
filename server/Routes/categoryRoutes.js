const express = require("express");
const router = express.Router();
const {
  createCategoryController,
  updateCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  deleteCategoryController,
} = require("../controller/categoryController");

const {
  verifyAuthentication,
  verifyAdmin,
} = require("../middleware/authMiddleware");

router.get("/all-category", getAllCategoryController);
router.get("/single-category/:slug", getSingleCategoryController);
router.post(
  "/create-category",
  verifyAuthentication,
  verifyAdmin,
  createCategoryController
);
router.patch(
  "/update-category/:id",
  verifyAuthentication,
  verifyAdmin,
  updateCategoryController
);

router.delete(
  "/delete-category/:id",
  verifyAuthentication,
  verifyAdmin,
  deleteCategoryController
);

module.exports = router;
