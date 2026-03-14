const User = require("../users/user.model");
const Ticket = require("../tickets/ticket.model");
const Quote = require("../quotes/quote.model");
const Visitors = require("../visitors/visitor.model");


//=====================Dashboard Statistics===================

exports.getDashboardStats = async () => {
   const [totalUsers, totalTickets, totalQuotes, totalVisitors,] = await Promise.all([
    User.countDocuments({ role: "user" }),
    Ticket.countDocuments(),
    Quote.countDocuments(),
    Visitors.countDocuments(),
  ]);

  return {
    visitors: totalVisitors,
    users: totalUsers,
    quotes: totalQuotes,
    tickets: totalTickets
  };
};

//======================USERS===================
exports.getUsers = async () => {
return await User.find().select("-password").sort({ createdAt: -1 });
};

//======================TICKETS===================
exports.getTickets = async () => {
  return await Ticket.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
};

//======================QUOTES===================
exports.getQuotes = async () => {
  return await Quote.find().sort({ createdAt: -1 });
};


//======================Visitors (latest 100)========
exports.getVisitors = async () => {
  return await Visitors.find()
  .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(100);
};


//=====================UPDATE USER================
exports.updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

//=====================DELETE USER================
exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};


//=====================CLOSE TICKET================
exports.closeTicket = async (id) => {
  return await Ticket.findByIdAndUpdate(id, { status: "closed" }, { new: true });
};