  require("dotenv").config()
const express = require("express");
const ConnetDB = require("./src/config/db")
const app = require("./src/app")
 ConnetDB();

app.listen(3000,()=>{
    console.log("server is running !!")
})