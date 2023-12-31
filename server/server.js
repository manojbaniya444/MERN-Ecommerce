const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./Routes/userRoutes");
const testRoutes = require("./Routes/testRoutes");
const categoryRoutes = require("./Routes/categoryRoutes");
const productRoute = require("./Routes/productRoutes");
const cartRoutes = require("./Routes/cartRoutes");

const {
  verifyAdmin,
  verifyAuthentication,
} = require("./middleware/authMiddleware");

require("dotenv").config();

const app = express();
app.use(express.json()); // Body parser
// app.use(express.urlencoded());
app.use(cors());

//! Routes
app.use("/users", userRoutes);
app.use("/test", verifyAuthentication, verifyAdmin, testRoutes);
app.use("/category", categoryRoutes);
app.use("/products", productRoute);
app.use("/cart", cartRoutes);

//! Connect to the mongo database and start the server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("MongoDb connected successfully");
      console.log(`Server is running on PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(
      `Failed to connect to the database and start the server`,
      error
    );
  });
