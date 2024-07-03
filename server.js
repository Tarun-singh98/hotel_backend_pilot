const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./db"); // Assuming you are connecting to your database here
require("dotenv").config();


// Middleware
app.use(bodyParser.json());

// Routes
const routes = require("./routes/routes");
app.use("/", routes);

// Start the server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app };
