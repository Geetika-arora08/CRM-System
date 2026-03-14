require("dotenv").config();

const app = require("./app");
const DBConnect = require("./config/db");

DBConnect();

const PORT = process.env.PORT || 1995;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
