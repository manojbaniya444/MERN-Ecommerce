const express = require("express");
const router = express.Router();

const {
  newOrderController,
  getMyOrder,
  getAllOrders,
  statusChangeHandler,
} = require("../controller/orderController");
const {
  verifyAuthentication,
  verifyUser,
  verifyAdmin,
} = require("../middleware/authMiddleware");

router.post("/orders", verifyAuthentication, verifyUser, newOrderController);
router.get("/my-order/:id", getMyOrder);
router.get("/all-orders", getAllOrders);
router.patch(
  "/status-change/:id",
  verifyAuthentication,
  verifyAdmin,
  statusChangeHandler
);

module.exports = router;
