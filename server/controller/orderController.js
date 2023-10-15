const orderModel = require("../model/orderModel");

const newOrderController = async (req, res) => {
  try {
    const { products, items, customer, address, contact, totalAmount } =
      req.body;

    if (
      products.length === 0 ||
      items.length === 0 ||
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
      items,
      totalAmount,
      date: new Date(),
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

const getMyOrder = async (req, res) => {
  try {
    const uid = req.params.id;
    if (uid) {
      const userOrder = await orderModel
        .find({ customer: uid })
        .sort({ createdAt: 1 });
      if (!userOrder) {
        return res.status(200).send({ userOrder: [] });
      }
      res.status(200).send({
        success: true,
        message: "User orders list response data fetch success",
        userOrder,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: "Error get user order", error });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ createdAt: -1 });
    res
      .status(200)
      .send({ success: true, message: "All orders fetch success.", orders });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ success: false, message: "All orders fetch", error });
  }
};

const statusChangeHandler = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    const order = await orderModel.findByIdAndUpdate(id, {
      status,
    });
    res
      .status(200)
      .send({ success: true, message: "Status update success for the item" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error updating status", error });
  }
};

module.exports = {
  newOrderController,
  getMyOrder,
  getAllOrders,
  statusChangeHandler,
};
