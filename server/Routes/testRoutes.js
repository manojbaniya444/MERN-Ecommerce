const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "User is authenticated and can access protected resources", redeemcode: "2jik543kj5k3j4kj3k" });
});

module.exports = router;
