const express = require("express");
const cors = require("cors");

const app = express();

// middlewares
app.use(cors({
  origin: "https://crm-system-lyart-eight.vercel.app",
  credentials: true
}));

app.use(express.json());

// routes (NEW MODULE ROUTES)
app.use("/api/auth", require("./modules/auth/auth.routes"));
app.use("/api/admin", require("./modules/admin/admin.routes"))

app.use("/api/users", require("./modules/users/user.routes"))
app.use("/api/tickets", require("./modules/tickets/ticket.routes"))
app.use("/api/quotes", require("./modules/quotes/quotes.routes"))


// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// health check
app.get("/", (req, res) => {
  res.send("Working");
});

module.exports = app;
