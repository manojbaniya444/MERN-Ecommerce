const slugify = require("slugify");
const categoryModel = require("../model/categoryModel");

//*Create new category
const createCategoryController = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .send({ success: false, message: "Name of the category required" });
  }

  const existingCategory = await categoryModel.findOne({ name });

  if (existingCategory) {
    return res.status(400).send({
      succcess: false,
      message: "Category already exists. Create a new one.",
    });
  }

  const category = new categoryModel({ name, slug: slugify(name) });

  await category.save();

  res
    .status(201)
    .send({ success: true, message: "New category created", category });
};

//*Update the category
const updateCategoryController = async (req, res) => {
  const { updatedName } = req.body;
  const { id } = req.params;

  if (!updatedName) {
    return res.status(400).send({ success: false, message: "Name required" });
  }

  const existingCategory = await categoryModel.findOne({ name: updatedName });

  if (existingCategory) {
    return res.status(400).send({
      success: false,
      message: "Category already exists. Take a new name.",
    });
  }

  try {
    const updatedCategory = await categoryModel.findByIdAndUpdate(id, {
      name: updatedName,
      slug: slugify(updatedName),
    });

    res.status(202).send({
      success: true,
      message: "Category name updated successfully",
      updatedCategory,
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Error updating category" });
  }
};

//*Get all category
const getAllCategoryController = async (req, res) => {
  try {
    const allCategory = await categoryModel.find();
    if (!allCategory) {
      res
        .status(200)
        .send({ success: false, message: "No category list found" });
    }

    res
      .status(200)
      .send({ success: true, message: "All category list", allCategory });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Error fetching category", error });
  }
};

//* Get single category
const getSingleCategoryController = async (req, res) => {
  const { slug } = req.params;

  try {
    const singleCategory = await categoryModel.findOne({ slug });
    if (!singleCategory) {
      return res
        .status(200)
        .send({ success: false, message: "No single catetgory found." });
    }

    return res
      .status(200)
      .send({ success: true, message: "Single category", singleCategory });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Catch error getting single category",
      error,
    });
  }
};

//* Delete category collection
const deleteCategoryController = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await categoryModel.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(400).send({ success: false, message: "Delete fail" });
    }

    res.status(200).send({
      success: true,
      message: "Category deleted from the list",
      deletedCategory,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: "Catch delete category" });
  }
};

module.exports = {
  createCategoryController,
  updateCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  deleteCategoryController,
};
