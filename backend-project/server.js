  require("dotenv").config()
const express = require("express");
const ConnetDB = require("./src/config/db")
const app = require("./src/app")
 ConnetDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});