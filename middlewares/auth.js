const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("../models/person");
// console.log(LocalStrategy.toString(), "local strategy");

const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made To: ${req.originalUrl}`
  );
  next(); // Move to the next phase
};

// Define the LocalStrategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // console.log("received credentials:", username, password);

      // Find user by username
      const user = await Person.findOne({ username });
      // console.log(user, "username : ");
      if (!user) {
        console.log("Incorrect username");
        return done(null, false, { message: "Incorrect username..." });
      }

      // Check if the password matches
      const isPasswordMatch = await user.comparePassword(password);
      // console.log(isPasswordMatch, "password matched : ");
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        console.log("Incorrect password");
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (error) {
      console.log("Authentication error:", error);
      return done(error);
    }
  })
);

module.exports = { logRequest, passport };
