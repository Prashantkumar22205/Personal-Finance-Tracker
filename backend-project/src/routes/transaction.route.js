const express = require("express");
const transactionController = require("../controllers/transaction.controller");
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router();

router.post("/add",authMiddleware.authUser,transactionController.addTransaction)
router.get("/",authMiddleware.authUser,transactionController.getTransactions)
router.put("/:id",authMiddleware.authUser,transactionController.updateTransaction)
router.delete("/:id",authMiddleware.authUser,transactionController.deleteTransaction)

module.exports=router