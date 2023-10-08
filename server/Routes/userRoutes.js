const express = require("express");
const {
  getAllUsers,
  registerUser,
  loginUser,
  userAuthentication,
  adminAuthentication,
} = require("../controller/userController");
const {
  verifyAuthentication,
  verifyAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/check-user-auth", verifyAuthentication, userAuthentication);
router.get(
  "/check-admin-auth",
  verifyAuthentication,
  verifyAdmin,
  adminAuthentication
);
module.exports = router;
