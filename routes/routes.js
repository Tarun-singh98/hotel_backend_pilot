const express = require("express");
const router = express.Router();

const personRoutes = require("./personRoutes");
const menuRoutes = require("./menuRoutes");

router.get("/", (req, res) => {
  res.send("Welcome to our hotel");
});
router.use("/person", personRoutes);
router.use("/menu", menuRoutes);

module.exports = router;
