const express = require("express");
require("dotenv").config();

const server = express();

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
