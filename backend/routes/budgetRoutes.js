const express = require("express")

const {
  getBudget,
  updateBudget,
} = require("../controllers/budgetController")

const protect = require("../middleware/authMiddleware")

const router = express.Router()

router.get("/", protect, getBudget)

router.put("/", protect, updateBudget)

module.exports = router