
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const authRoutes = require("./routes/authRoutes")
const protectedRoutes = require("./routes/protectedRoutes")
const transactionRoutes = require("./routes/transactionRoutes")
const budgetRoutes = require("./routes/budgetRoutes")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/protected", protectedRoutes)
app.use("/api/transactions", transactionRoutes)
app.use("/api/budget", budgetRoutes)

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully")
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message)
  })

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Expense Tracker API is running",
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

