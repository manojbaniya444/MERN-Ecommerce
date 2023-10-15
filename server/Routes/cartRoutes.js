const express = require("express");
const router = express.Router();

const { newOrderController } = require("../controller/orderController");
const {
  verifyAuthentication,
  verifyUser,
} = require("../middleware/authMiddleware");

router.post("/orders", newOrderController);

module.exports = router;
