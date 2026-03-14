const Ticket = require("../tickets/ticket.model");

//==================USER CREATE TICKET==================
exports.createTicket = async (req, res) => {
  try {
    // console.log("BODY:", req.body); 

    const { subject, description, priority } = req.body;

    const ticket = await Ticket.create({
      subject,
      description,
      priority,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE TICKET STATUS =================
exports.updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = status;
    await ticket.save();

    res.json({
      success: true,
      message: "Ticket updated",
      ticket,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};