const express = require("express");
const {
  getAllUsers,
  registerUser,
  loginUser,
  userAuthentication,
} = require("../controller/userController");
const { verifyAuthentication } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/check-user-auth", verifyAuthentication, userAuthentication);
module.exports = router;
