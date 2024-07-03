const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "manager", "waiter"],
    required: true,
  },
  mobile: {
    type: "number",
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

personSchema.pre("save", async function (next) {
  const person = this;
  // Hash the password only if it has been modified (or is new)
  if (!person.isModified("password")) return next();
  try {
    // hash password generation
    const salt = await bcrypt.genSalt(10);
    //hash the password
    const hashedPassword = await bcrypt.hash(person.password, salt);
    person.password = hashedPassword;
    next();
  } catch (error) {}
});

personSchema.methods.comparePassword = async function (password) {
  try {
    //Use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

//Create Person Modal
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
