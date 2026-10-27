const express = require("express")

const {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController")

const protect = require("../middleware/authMiddleware")

const router = express.Router()

// Add transaction
router.post("/", protect, addTransaction)

// Get user's transactions
router.get("/", protect, getTransactions)

// Update transaction
router.put("/:id", protect, updateTransaction)

// Delete transaction
router.delete("/:id", protect, deleteTransaction)

module.exports = router