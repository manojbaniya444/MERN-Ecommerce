const JWT = require("jsonwebtoken");
const userModal = require("../model/userModel");
require("dotenv").config();

const JWT_SECRET = process.env.ACCESS_SECRET;

//* Authentication test
const verifyAuthentication = async (req, res, next) => {
  try {
    const decoded = JWT.verify(req.headers.authorization, JWT_SECRET);
    // authentication and decoded value in the user
    req.user = decoded;
    next();
  } catch (error) {
    console.log(req.headers);

    res.status(403).send({
      succss: false,
      message: "Unauthorized",
      error,
    });
  }
};

//* Admin check
const verifyAdmin = async (req, res, next) => {
  const currentUser = await userModal.findById(req.user.id);

  try {
    if (currentUser?.role !== 1) {
      return res
        .status(403)
        .send({ success: false, message: "Admin login required", currentUser });
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ success: false, message: "Admin verify failed", error });
  }
};

//* User check
const verifyUser = async (req, res, next) => {
  const currentUser = await userModal.findById(req.user.id);

  try {
    if (currentUser?.role === 1) {
      return res
        .status(403)
        .send({ success: false, message: "Login with user required" });
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ success: false, message: "Admin User failed", error });
  }
};

module.exports = { verifyAuthentication, verifyAdmin, verifyUser };
