const Ticket = require("../tickets/ticket.model");
const Quote = require("../quotes/quote.model");


// ================= USER DASHBOARD =================
exports.userdashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("REQ.USER:", req.user);

    const totalQuotes = await Quote.countDocuments({
      user: userId,
    });

    const openTickets = await Ticket.countDocuments({
      user: userId,
      status: { $in:["open", "in-progress"]} 
    });

    const closedTickets = await Ticket.countDocuments({
      user: userId,
      status: "closed",
    });

    // ✅ recent tickets
    const recentTickets = await Ticket.find({
      user: userId,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    // ✅ recent quotes
    const recentQuotes = await Quote.find({
      user: userId,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
},
    stats: {
      totalQuotes,
      openTickets,
      closedTickets,
      },
      recentTickets,
      recentQuotes,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};