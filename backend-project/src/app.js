const express = require("express");
const cookieParser =require("cookie-parser")
const userAuthentication = require("./routes/auth.route")
const transactionRoute = require("./routes/transaction.route")
const cors = require("cors")
const app = express();

app.use(cors({
    origin: ["http://localhost:5173",
    "https://personal-finance-tracker-kwjilaej6-prashant-s-projects20.vercel.app",
    ],
    credentials: true,              
  }));

app.use(express.json())
app.use(cookieParser())


app.use("/api/auth",userAuthentication)
app.use("/api/transactions",transactionRoute)

module.exports=app;