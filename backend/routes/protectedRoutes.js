const express = require("express")
const protect = require("../middleware/authMiddleware")

const router = express.Router()

router.get("/test", protect, (req, res) => {
  res.json({
    message: "Protected route is working",
    userId: req.userId,
  })
})

module.exports = router