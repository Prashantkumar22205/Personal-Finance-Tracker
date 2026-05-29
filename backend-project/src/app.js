const express = require("express");
const cookieParser =require("cookie-parser")
const userAuthentication = require("./routes/auth.route")
const transactionRoute = require("./routes/transaction.route")
const cors = require("cors")
const app = express();

app.use(cors({
    origin: true,
    credentials: true,              
  }));

app.use(express.json())
app.use(cookieParser())


app.use("/api/auth",userAuthentication)
app.use("/api/transactions",transactionRoute)

module.exports=app;