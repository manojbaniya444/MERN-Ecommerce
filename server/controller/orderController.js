const orderModel = require("../model/orderModel");

const newOrderController = async (req, res) => {
  try {
    const { products, customer, address, contact, totalAmount } = req.body;

    if (
      products.length === 0 ||
      !customer ||
      !address ||
      !contact ||
      !totalAmount
    ) {
      return res
        .status(400)
        .send({ success: false, message: "Products or customer id required" });
    }
    const newOrder = new orderModel({
      address,
      contact,
      customer,
      products,
      totalAmount,
    });
    await newOrder.save();
    res.status(200).send({
      success: true,
      message: "Order placed successfully",
      newOrder,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error creating new order",
      err,
    });
  }
};

module.exports = { newOrderController };
