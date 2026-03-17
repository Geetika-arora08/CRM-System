const User = require("../users/user.model");
const Ticket = require("../tickets/ticket.model");
const Quote = require("../quotes/quote.model");
const Visitors = require("../visitors/visitor.model");

// ===================== DASHBOARD STATS ====================
exports.getDashboardStats = async () => {
  try {
    const [totalUsers, totalTickets, totalQuotes, totalVisitors] = await Promise.all([
      User.countDocuments(), // all users
      Ticket.countDocuments(),
      Quote.countDocuments(),
      Visitors.countDocuments(),
    ]);

    return {
      users: totalUsers,
      tickets: totalTickets,
      quotes: totalQuotes,
      visitors: totalVisitors,
    };
  } catch (err) {
    throw new Error("Failed to fetch dashboard stats: " + err.message);
  }
};

// ===================== USERS ====================
exports.getUsers = async () => {
  return await User.find().select("-password").sort({ createdAt: -1 });
};

exports.updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

// ===================== TICKETS ====================
exports.getTickets = async () => {
  return await Ticket.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
};

exports.closeTicket = async (id) => {
  return await Ticket.findByIdAndUpdate(id, { status: "closed" }, { new: true });
};

// ===================== QUOTES ====================
exports.getQuotes = async () => {
  return await Quote.find().sort({ createdAt: -1 });
};

// ===================== VISITORS ====================
exports.getVisitors = async () => {
  return await Visitors.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(100);
};