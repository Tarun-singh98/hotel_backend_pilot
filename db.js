const mongoose = require("mongoose");
require("dotenv").config();

// const mongoURL = process.env.LOCAL_URL;

const mongoURL = process.env.DB_URL;
mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB server");
});
db.on("error", (err) => {
  console.log("Error connecting to mongoDB server", err);
});
db.on("disconnect", () => {
  console.log("Disconnected to MongoDB server");
});

module.exports = db;
