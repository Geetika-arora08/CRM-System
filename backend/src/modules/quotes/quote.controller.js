const Quote = require("./quote.model");

exports.CreateQuote = async (req,res) =>{
    try{
      const { service, message } = req.body;
        const quote = await Quote.create({
            user: req.user._id,
            name: req.user.name,
            email: req.user.email,
            service,
            message,
        });
        res.status(201).json({
  success: true,
  message: "Quote created successfully",
  data: quote
});

    }
    catch(err) {
        res.status(500).json({ message: err.message});
    }
}

exports.getUserQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

     res.json({
      success: true,
      data: quotes
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= ADMIN - GET ALL QUOTES =================
exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: quotes
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= ADMIN - UPDATE STATUS =================
exports.updateQuoteStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    quote.status = status;
    await quote.save();

    res.json({
      success: true,
      message: "Quote updated successfully",
      data: quote
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
