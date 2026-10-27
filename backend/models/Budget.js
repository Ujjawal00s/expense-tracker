const mongoose = require("mongoose")

const budgetSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)

const Budget = mongoose.model("Budget", budgetSchema)

module.exports = Budget