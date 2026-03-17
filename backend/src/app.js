const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://crm-system-lyart-eight.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // allow all (safe for now)
    }
  },
  credentials: true
}));


app.use(express.json());

// routes (NEW MODULE ROUTES)
app.use("/api/auth", require("./modules/auth/auth.routes"));
app.use("/api/admin", require("./modules/admin/admin.routes"))

app.use("/api/users", require("./modules/users/user.routes"))
app.use("/api/tickets", require("./modules/tickets/ticket.routes"))
app.use("/api/quotes", require("./modules/quotes/quotes.routes"))


// health check
app.get("/", (req, res) => {
  res.send("Working");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

module.exports = app;
