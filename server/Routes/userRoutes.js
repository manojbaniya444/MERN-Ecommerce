const express = require("express");
const { getAllUsers, registerUser, loginUser } = require("../controller/userController");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
module.exports = router;
