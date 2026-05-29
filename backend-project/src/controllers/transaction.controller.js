const transactionModel = require("../models/transaction.model")

 const addTransaction = async (req, res) => {
  try {

    const { title, amount, type, category } = req.body;

    const transaction = await transactionModel.create({
      title,
      amount,
      type,
      category,
      user: req.user.userId,
    });

    res.status(201).json({
      message: "Transaction added",
      transaction,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

 const getTransactions = async (req, res) => {
  try {

    const transactions = await transactionModel.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(transactions);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

 const updateTransaction = async (req, res) => {
  try {

    const updatedTransaction =
      await transactionModel.findByIdAndUpdate(
        {
           _id:req.params.id,
          user: req.user.userId,
        },
        req.body,
        {
         returnDocument: "after"
        }
      );

    res.status(200).json({
      message: "Transaction updated",
      transaction: updatedTransaction,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


 const deleteTransaction = async (req, res) => {
  try {

    await transactionModel.findByIdAndDelete({
    _id:  req.params.id,
    user:  req.user.userId
   } );

    res.status(200).json({
      message: "Transaction deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports={addTransaction,getTransactions,deleteTransaction,updateTransaction}