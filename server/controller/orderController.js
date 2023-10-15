const orderModel = require("../model/orderModel");

const newOrderController = async (req, res) => {
  try {
    const { products, customer, address, contact, totalAmount } = req.body;

    // if (!products || !customer || !address || !contact || !totalAmount) {
    //   return res
    //     .status(400)
    //     .send({ success: false, message: "Products or customer id required" });
    // }

    console.log(...req.body);

    const newOrder = new orderModel({
      products,
      customer,
      address,
      contact,
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
    res
      .status(500)
      .send({ success: false, message: "Error creating new order", err });
  }
};

module.exports = { newOrderController };
