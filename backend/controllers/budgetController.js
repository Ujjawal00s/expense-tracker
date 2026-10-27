const Budget = require("../models/Budget")

// Get user's budget
const getBudget = async (req, res) => {
  try {
    let budget = await Budget.findOne({
      user: req.userId,
    })

    // If budget does not exist, create one with 0
    if (!budget) {
      budget = await Budget.create({
        amount: 0,
        user: req.userId,
      })
    }

    res.status(200).json({
      budget,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

// Update user's budget
const updateBudget = async (req, res) => {
  try {
    const { amount } = req.body

    if (amount === undefined || amount === null || amount < 0) {
      return res.status(400).json({
        message: "Please enter a valid budget amount",
      })
    }

    const budget = await Budget.findOneAndUpdate(
      { user: req.userId },
      {
        amount,
        user: req.userId,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    )

    res.status(200).json({
      message: "Budget updated successfully",
      budget,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}

module.exports = {
  getBudget,
  updateBudget,
}