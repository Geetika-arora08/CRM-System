const express = require("express");
const router = express.Router();

const { protect, isUser, isAdmin } = require("../../middleware/authMiddleware");
const ticketController = require("./ticket.controller");

// Create ticket (User)
router.post("/", protect, isUser, ticketController.createTicket);

// Get my tickets (User)
router.get("/mytickets", protect, isUser, ticketController.getUserTickets);

// Update status (Admin)
router.put("/:id", protect, isAdmin, ticketController.updateTicketStatus);

module.exports = router;
