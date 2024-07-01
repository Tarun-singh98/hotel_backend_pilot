const mongoose = require("mongoose");
const mogoURL =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.5";

mongoose.connect(mogoURL);

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
