const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    page: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema, "visitors");