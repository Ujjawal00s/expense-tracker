const Transaction = require("../models/Transaction")

// Add Transaction
const addTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date, description } = req.body

    // Check required fields
    if (!title || !amount || !type || !category || !date) {
      return res.status(400).json({
        message: "Please fill all required fields",
      })
    }

    // Create transaction
    const transaction = await Transaction.create({
      title,
      amount,
      type,
      category,
      date,
      description,
      user: req.userId,
    })

    res.status(201).json({
      message: "Transaction added successfully",
      transaction,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

// Get Transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.userId,
    }).sort({ date: -1 })

    res.status(200).json({
      transactions,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

// Update Transaction
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params

    const transaction = await Transaction.findOneAndUpdate(
      {
        _id: id,
        user: req.userId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      })
    }

    res.status(200).json({
      message: "Transaction updated successfully",
      transaction,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

// Delete Transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params

    const transaction = await Transaction.findOneAndDelete({
      _id: id,
      user: req.userId,
    })

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      })
    }

    res.status(200).json({
      message: "Transaction deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

module.exports = {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
}