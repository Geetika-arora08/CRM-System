const express = require("express");
const router = express.Router();

const {
  CreateQuote,
  getUserQuotes,
  getAllQuotes,
  updateQuoteStatus
} = require("./quote.controller");

const { protect, isUser, isAdmin } = require("../../middleware/authMiddleware");

// CREATE QUOTE
router.post("/", protect, isUser, CreateQuote);

// USER QUOTE HISTORY
router.get("/myquotes", protect, isUser, getUserQuotes);


// ================= ADMIN ROUTES =================

// Get All Quotes
router.get("/all", protect, isAdmin, getAllQuotes);

// Update Quote Status
router.put("/:id", protect, isAdmin, updateQuoteStatus);


module.exports = router;