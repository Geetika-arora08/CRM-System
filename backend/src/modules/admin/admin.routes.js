const express = require("express");
const router = express.Router();

// const { getAllTickets } = require('./admin.controller')

const { protect, isAdmin } = require("../../middleware/authMiddleware");

const {
  adminDashboard,
  getUsers,
  getTickets,
  getQuotes,
  getVisitors,
  updateUser,
  deleteUser,
  closeTicket,
  createTicket,
  updateTicketStatus
} = require("./admin.controller");
const {changePassword} = require('../auth/auth.controller')

// Apply middleware to all admin routes
router.use(protect, isAdmin);

router.get("/dashboard", adminDashboard);

router.get("/users", getUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.get("/tickets", getTickets);
router.post("/tickets", createTicket); 
router.put("/tickets/:id/status", updateTicketStatus);
router.put("/tickets/:id/close", closeTicket);

router.get("/quotes", getQuotes);
router.get("/visitors", getVisitors);

router.put("/change-password", changePassword);

module.exports = router;




