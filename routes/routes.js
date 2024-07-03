const express = require("express");
const router = express.Router();

const personRoutes = require("./personRoutes");
const menuRoutes = require("./menuRoutes");

// Middleware to log requests
const { logRequest, passport } = require("../middlewares/auth");

// Use the logRequest middleware for all routes
router.use(logRequest);

// Initialize Passport
router.use(passport.initialize());

// Test Login Route
// router.post("/", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return res.status(500).send({ error: "Internal Server Error" });
//     }
//     if (!user) {
//       return res.status(401).send(info);
//     }
//     return res.status(200).send({ message: "Authentication successful", user });
//   })(req, res, next);
// });

// Unprotected route
router.get(
  "/",

  (req, res) => {
    res.send("Welcome to our hotel");
  }
);

// Protect person and menu routes
router.use("/person", personRoutes);
router.use("/menu", menuRoutes);

module.exports = router;
