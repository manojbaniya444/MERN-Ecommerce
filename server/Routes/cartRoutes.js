const express = require("express");
const router = express.Router();

const {
  newOrderController,
  getMyOrder,
  getAllOrders,
  statusChangeHandler,
  getAllDeliveredItems,
  getDeliveredUserOrder,
} = require("../controller/orderController");
const {
  verifyAuthentication,
  verifyUser,
  verifyAdmin,
} = require("../middleware/authMiddleware");

router.post("/orders", verifyAuthentication, verifyUser, newOrderController);
router.get("/my-order/:id", getMyOrder);
router.get("/all-orders", getAllOrders);
router.get("/delivered-orders", getAllDeliveredItems);
router.get(
  "/delivered/:id",
  // verifyAuthentication,
  // verifyUser,
  getDeliveredUserOrder
);
router.patch(
  "/status-change/:id",
  verifyAuthentication,
  verifyAdmin,
  statusChangeHandler
);

module.exports = router;
