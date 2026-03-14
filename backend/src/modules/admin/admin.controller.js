const adminService = require("./admin.service");
const Ticket = require("../tickets/ticket.model");

//================== Admin Dashboard==================
exports.adminDashboard = async (req, res) => {
  try {
    const stats = await adminService.getDashboardStats();

    res.status(200).json({
    success: true,
    message: `Welcome ${req.user.name}`,
    user: {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
    },
      stats
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//==================GET ALL USERS==================
exports.getUsers = async (req, res) => {
  try {
    const users = await adminService.getUsers();
    res.status(200).json({
    success: true,
    data: users
});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//==================CREATE TICKETS==================
exports.createTicket = async (req, res) => {
  try {
    // console.log("BODY:", req.body); 

    const { subject, description, priority  } = req.body;

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

//==================GET ALL TICKETS==================
exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
    success: true,
    data: tickets
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//==================UPDATE TICKETS==================
exports.updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

  if (!ticket) {
  return res.status(404).json({
  success: false,
  message: "Ticket not found"
  });
}

  res.status(200).json({
  success: true,
  data: ticket
  });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//==================GET ALL QUOTES==================
exports.getQuotes = async (req, res) => {
  try {
    const quotes = await adminService.getQuotes();
    res.status(200).json({
    success: true,
    data: quotes
    }); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//==================GET ALL VISITORS==================
exports.getVisitors = async (req, res) => {
  try {
    const visitors = await adminService.getVisitors();
    res.status(200).json({
  success: true,
  data: visitors
});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//==================UPDATE USER==================
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await adminService.updateUser(req.params.id, req.body);
    res.json({ message: "User updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//==================DELETE USER==================
exports.deleteUser = async (req, res) => {
  try {
    await adminService.deleteUser(req.params.id);
    res.status(200).json({
  success: true,
  message: "User deleted"
});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//==================CLOSE TICKET==================
exports.closeTicket = async (req, res) => {
  try {
    await adminService.closeTicket(req.params.id);
    res.status(200).json({
    success: true,
    message: "Ticket closed" 
  });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// exports.getAllTickets = async (req, res) => {
//     try {

//         const tickets = await Ticket.find()
//             .populate('createdBy', 'name email') // optional if you have ref
//             .sort({ createdAt: -1 });

//         res.status(200).json({
//             success: true,
//             count: tickets.length,
//             data: tickets
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch tickets",
//             error: error.message
//         });
//     }
// };


