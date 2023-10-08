const JWT = require("jsonwebtoken");
const userModal = require("../model/userModal");
require("dotenv").config();

const JWT_SECRET = process.env.ACCESS_SECRET;

//* Authentication test
const verifyAuthentication = async (req, res, next) => {
  try {
    const decoded = await JWT.verify(req.headers.authorization, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
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

module.exports = { verifyAuthentication, verifyAdmin };
