const bcrypt = require("bcrypt");
const userModal = require("../model/userModal");
const JWT = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "9df0d9f93090f";
// const JWT_SECRET = process.env.JWT_SECRET;

const getAllUsers = (req, res) => {
  res.status(200).send({
    success: true,
    message: "Get all users success.",
  });
};

//* Register user controller

const registerUser = async (req, res) => {
  const { name, password, email, role, answer } = req.body;
  if (!name || !password || !email || !answer) {
    return res
      .status(401)
      .status({ success: false, message: "Validation failed." });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new userModal({
      name,
      password: hashedPassword,
      email,
      role,
      answer,
    });
    await user.save();

    res
      .status(200)
      .send({ success: true, message: "User registered successfully", user });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Failed registering user", error });
  }
};

//* Login User Controller

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const registeredUser = await userModal.findOne({ email });
  if (!registeredUser) {
    return res
      .status(404)
      .send({ success: false, message: "No user registered in the database." });
  }
  const hashedPassword = registeredUser?.password;

  const validPassword = await bcrypt.compare(password, hashedPassword);

  if (!validPassword) {
    return res
      .status(401)
      .send({ success: false, message: "Incorrect Password" });
  }

  // Provide token after successful password validation
  const token = JWT.sign(
    { id: registeredUser._id, username: registeredUser._id },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  //   req.user = registerUser;

  return res.status(200).send({
    success: true,
    message: "Logged in successfully",
    token,
  });
};

module.exports = { getAllUsers, registerUser, loginUser };
